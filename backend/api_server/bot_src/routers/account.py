import datetime
from dataclasses import dataclass

import aiohttp
from aiogram import Router, F
from aiogram.enums import ParseMode
from aiogram.types import Message, InlineKeyboardMarkup, CallbackQuery, ReplyKeyboardRemove
from aiogram.filters.command import CommandStart, Command, CommandObject
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters.callback_data import CallbackData
from sqlalchemy import select
from sqlalchemy.orm import Session
from aiogram.utils.keyboard import InlineKeyboardBuilder

from .public import get_event_by_id
from ..utils import *

r = Router()
base_link = "https://ecoprosvet.karmanow.ru"

account_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="📍 Указать свой регион", callback_data="set_region")],
        [InlineKeyboardButton(text="✨ Мои интересы", callback_data="set_tags")],
        [InlineKeyboardButton(text="📆 Список мероприятий", callback_data="events")],
        [InlineKeyboardButton(text="☘️ Мои регистрации", callback_data="my_subs")],
    ])


@r.message(CommandStart())
async def start(m: Message):
    try:
        user = await sync_to_async(User.objects.get)(telegram_id=m.from_user.id)
    except User.DoesNotExist:
        user = await sync_to_async(User.objects.create)(telegram_id=m.from_user.id, fio=m.from_user.first_name,
                                                        active=True)
    text = (f"{m.from_user.first_name}, Добро пожаловать в Эко-просвет 😊 ! С помощью нашего бота Вы можете "
            f"подписаться на активности города Москвы и получать уведомления о предстоящих мероприятиях 🔔 "
            f"по вашим интересам")

    await m.answer(text=text, reply_markup=account_keyboard)


@r.callback_query(lambda c: c.data == 'set_region')
async def set_events(c: CallbackQuery):
    text = '📍 В каком регионе Вы проживаете?'
    districts = await get_all_districts()
    keyboard = InlineKeyboardBuilder()
    for district in districts:
        keyboard.button(text=district.name, callback_data=f'district:{district.id}')
    await c.message.edit_text(text=text, reply_markup=keyboard.as_markup())
    await c.answer()


@r.callback_query(lambda c: c.data == 'set_tags')
async def set_tags(c: CallbackQuery):
    user = await get_user(c)
    text = '✨ Какие эко-активности Вам интересны?'
    tags = await get_all_tags()
    user_tags_ids = await get_user_tags_ids(user)
    keyboard = InlineKeyboardBuilder()
    for tag in tags:
        icon = '✅ ' if tag.id in user_tags_ids else ''
        keyboard.button(text=icon + tag.name, callback_data=f'tag:{tag.id}')
    keyboard.button(text='🔙 Назад', callback_data='account')
    keyboard.adjust(1)
    await c.message.edit_text(text=text, reply_markup=keyboard.as_markup())
    await c.answer()


@sync_to_async
def get_account_text(user: User):
    text = f'Вы получаете уведомления по эко-активностям региона {user.district.name if user.district else "неуказано"}'
    return text


@r.callback_query(lambda c: c.data == 'account')
async def account(c: CallbackQuery):
    user = await get_user(c)
    text = await get_account_text(user)
    await c.message.edit_text(text=text, reply_markup=account_keyboard)
    await c.answer()


@r.callback_query(lambda c: c.data.startswith('district:'))
async def set_events(c: CallbackQuery):
    district_id = int(c.data.split(':')[-1])
    user = await get_user(c)
    user.district = await sync_to_async(District.objects.get)(id=district_id)
    await sync_to_async(user.save)()
    await account(c)


@r.callback_query(lambda c: c.data.startswith('tag:'))
async def set_events(c: CallbackQuery):
    @sync_to_async
    def is_tag_exists(_user: User, _tag: Tag):
        return UserTag.objects.filter(user=_user, tag=_tag).first()

    user = await get_user(c)
    tag_id = int(c.data.split(':')[-1])
    exist = await is_tag_exists(user, tag_id)
    if exist:
        await sync_to_async(exist.delete)()
    else:
        await UserTag.objects.acreate(user_id=user.id, tag_id=tag_id)
    await set_tags(c)


@r.callback_query(lambda c: c.data.startswith('event:sub:'))
async def event_sub(c: CallbackQuery):
    event_id = c.data.split(':')[-1]
    event = await get_event_by_id(event_id)
    user = await get_user(c)
    await EventSub.objects.acreate(event_id=event.id, user=user)
    text = (f'<b>Бронирование {event.title}</b>\n'
            f'{event.date_time.strftime("%d.%m.%Y %H:%M")}\n\n'
            f'Ждём Вас в гости 😊')
    await c.message.answer(text=text, parse_mode=ParseMode.HTML, reply_markup=account_keyboard)
    await c.message.edit_reply_markup(reply_markup=InlineKeyboardBuilder().as_markup())
    await c.answer()


@r.callback_query(lambda c: c.data.startswith('my_subs'))
async def my_subs(c: CallbackQuery):
    user = await get_user(c)
    events = await get_events()
    text = '<b>Предстоящие мероприятия 🎉</b>'
    keyboard = InlineKeyboardBuilder()
    user_event_subs_ids = await get_user_events_ids(user)
    for event in events[:99]:
        if event.id not in user_event_subs_ids:
            continue
        keyboard.button(text=event.title, callback_data=f'event:{event.id}')
    keyboard.button(text='🔙 Назад', callback_data='account')
    keyboard.adjust(1)
    if c.message.photo:
        await c.message.answer(text=text, reply_markup=keyboard.as_markup(), parse_mode=ParseMode.HTML)
        await c.message.delete()
        await c.answer()
    else:
        await c.message.edit_text(text=text, reply_markup=keyboard.as_markup(), parse_mode=ParseMode.HTML)
        await c.answer()
