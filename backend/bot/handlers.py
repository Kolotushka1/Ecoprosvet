import datetime

import aiohttp
from aiogram import Router, F
from aiogram.types import Message, InlineKeyboardMarkup, CallbackQuery
from aiogram.filters.command import CommandStart, Command, CommandObject
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters.callback_data import CallbackData
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import *

r = Router()
base_link = "https://ecoprosvet.karmanow.ru"


class JoinData(CallbackData, prefix="join"):
    event_id: int


@r.message(CommandStart(deep_link=True))
async def start_deep(m: Message, command: CommandObject):
    pass


@r.message(CommandStart())
async def start(m: Message):
    await m.answer("Рады приветствовать вас в боте Экоспросвет! Чтобы пользоваться ботом, необходимо привязать свой аккаунт через сайт",
                   reply_markup=InlineKeyboardMarkup(inline_keyboard=[[InlineKeyboardButton(text="Перейти на сайт", url="https://ecoprosvet.karmanow.ru")]]))


@r.message(Command("my_events"))
async def my_events(m: Message, session: Session):
    user_id = session.scalars(select(User).where(User.telegram_id == m.from_user.id)).one_or_none()
    if not user_id:
        return await m.answer(
            "Чтобы пользоваться ботом, необходимо привязать свой аккаунт через сайт",
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[[InlineKeyboardButton(text="Перейти на сайт", url="https://ecoprosvet.karmanow.ru")]]))
    event_ids = session.scalars(select(UserEvent).where(UserEvent.user_id == user_id)).all()
    events = list()
    for event_id in event_ids:
        event = session.get(Event, event_id.event_id)
        if event.date > datetime.date.today():
            org = session.get(Organization, event.organization_id)
            events.append(f"<b>{event.title}</b> ({event.date.strftime('%d-%m-%Y')}) - {org.organization_name}")

    if events:
        await m.answer(f"Ближайшие мероприятия, в которых ты участвуешь:\n\n{'\n'.join(events)}")
    else:
        await m.answer("В ближайшее время ты не участвуешь ни в каких мероприятиях")
