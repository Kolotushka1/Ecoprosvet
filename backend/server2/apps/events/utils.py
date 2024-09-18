import asyncio
import os

from aiogram import Bot
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

from models import *

bot = Bot(os.getenv('BOT_TOKEN'))
base_link = "https://ecoprosvet.karmanow.ru"


async def mail(event: Event) -> tuple[int, int]:
    txt = f"""Новое мероприятие по вашим интересам!
    
<b>{event.title}</b>

{event.description}

<b>Когда:</b> {event.date.strftime('%d-%m-%Y')}

<b>Где:</b> {event.address}

<b>Организатор</b>: {event.organization.name}"""

    link = f"{base_link}/events/{event.id}"
    users = get_all_event_tag_subs(event)
    errors = 0
    suc = 0
    for user in users:
        try:
            await bot.send_message(
                user,
                txt,
                reply_markup=InlineKeyboardMarkup(inline_keyboard=[
                    [InlineKeyboardButton(text="Посмотреть на сайте", url=link)]
                ]))
        except:
            errors += 1
        else:
            suc += 1
        finally:
            await asyncio.sleep(1)
    return suc, errors


def get_all_event_tag_subs(event: Event) -> list[int]:
    tags = event.event_tags.all()
    subs = set()
    for tag in tags:
        for sub in tag.user_tags.all():
            if sub.user.telegram_id:
                subs.add(sub.user.telegram_id)
    return list(subs)
