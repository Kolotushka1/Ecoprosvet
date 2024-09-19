import datetime
from dataclasses import dataclass

import aiohttp
from aiogram import Router, F
from aiogram.types import Message, InlineKeyboardMarkup, CallbackQuery
from aiogram.filters.command import CommandStart, Command, CommandObject
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters.callback_data import CallbackData
from sqlalchemy import select
from sqlalchemy.orm import Session
from aiogram.utils.keyboard import InlineKeyboardBuilder
from asgiref.sync import sync_to_async

from models import *
from apps.events.models import Tag
from apps.main.models import User, District

r = Router()
base_link = "https://ecoprosvet.karmanow.ru"


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
            events.append(f"<b>{event.name}</b> ({event.date.strftime('%d-%m-%Y')}) - {org.name}")
    try:
        user = await sync_to_async(User.objects.filter(telegram_id=m.from_user.id).first)()
    except User.DoesNotExist:
        user = User(telegram_id=m.from_user.id, fio=m.from_user.first_name, name=m.from_user.first_name)
    text = (f"{m.from_user.first_name}, Добро пожаловать в Экопросвет 😊 ! С помощью нашего бота Вы можете "
            f"подписаться на активности города Москвы и получать уведомления о предстоящих мероприятиях 🔔 "
            f"по вашим интересам")
    reply_markup = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="📍 Указать свой регион", callback_data="set_region")],
            [InlineKeyboardButton(text="✨ Указать свои интересы", callback_data="set_tags")],
        ])
    await m.answer(text=text, reply_markup=reply_markup)


    if events:
        await m.answer(f"Ближайшие мероприятия, в которых ты участвуешь:\n\n{'\n'.join(events)}")
    else:
        await m.answer("В ближайшее время ты не участвуешь ни в каких мероприятиях")
@dataclass
class DistrictData:
    id: int
    name: str


@dataclass
class TagData:
    id: int
    name: str


@sync_to_async
def get_all_districts():
    districts = District.objects.all()
    return [DistrictData(district.id, district.name) for district in districts]


@sync_to_async
def get_all_tags():
    tags = Tag.objects.all()
    return [TagData(tag.id, tag.name) for tag in tags]


@r.callback_query(lambda c: c.data == 'set_region')
async def set_events(c: CallbackQuery):
    text = 'В каком регионе вы проживаете?'
    districts = await get_all_districts()
    keyboard = InlineKeyboardBuilder()
    for district in districts:
        keyboard.button(text=district.name, callback_data=f'district:{district.id}:')
    await c.
    await c.answer()
