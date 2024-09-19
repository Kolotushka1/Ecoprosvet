import datetime
from dataclasses import dataclass

import aiohttp
from aiogram import Router, F
from aiogram.enums import ParseMode
from aiogram.types import Message, InlineKeyboardMarkup, CallbackQuery, FSInputFile
from aiogram.filters.command import CommandStart, Command, CommandObject
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters.callback_data import CallbackData
from django.utils import timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
from aiogram.utils.keyboard import InlineKeyboardBuilder
from asgiref.sync import sync_to_async

from apps.events.models import Tag, UserTag, Event
from ..utils import *

r = Router()
base_link = "https://ecoprosvet.karmanow.ru"



@sync_to_async
def get_event_by_id(event_id):
    event = Event.objects.get(id=event_id)
    tags = [event_tag.tag.name for event_tag in event.event_tags.all()]
    return EventData(event.id, event.title, event.organization.organization_name, event.image.path,
                     event.about, event.date, tags)


@r.callback_query(lambda c: c.data.startswith('events'))
async def my_subs(c: CallbackQuery):
    events = await get_events()
    text = '<b>Предстоящие мероприятия 🎉</b>'
    keyboard = InlineKeyboardBuilder()
    for event in events[:99]:
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


@r.callback_query(lambda c: c.data.startswith('event:'))
async def my_subs(c: CallbackQuery):
    event_id = int(c.data.split('event:')[1])
    event = await get_event_by_id(event_id)
    text = (f'<b>{event.title}</b>\n\n'
            f'{event.about}\n\n'
            f'{event.organisation}\n'
            f'{event.date_time.strftime("%d.%m.%Y %H:%M")}\n')
    for tag in event.tags:
        text += f'\n📌 {tag}'
    keyboard = InlineKeyboardBuilder()
    user = await get_user(c)
    user_event_subs_ids = await get_user_events_ids(user)
    print(event_id, user_event_subs_ids, event_id in user_event_subs_ids)
    if event_id in user_event_subs_ids:
        text += '\n\n📍 Вы зарегистрированы на мероприятие!'
    else:
        keyboard.button(text='👉 Зарегистрироваться', callback_data=f'event:sub:{event.id}')
    keyboard.button(text='🔙 Все мероприятия', callback_data='events')
    keyboard.adjust(1)
    image_from_pc = FSInputFile(event.image)
    await c.message.answer_photo(caption=text, reply_markup=keyboard.as_markup(),
                                 parse_mode=ParseMode.HTML, photo=image_from_pc)
    await c.message.delete()
    await c.answer()
