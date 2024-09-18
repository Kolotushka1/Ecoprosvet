import asyncio
import os

from aiogram import Bot
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

# from ..models import Event

bot = Bot(os.getenv('BOT_TOKEN'))
base_link = "https://ecoprosvet.karmanow.ru"


class TelegramInformer:
    @staticmethod
    async def mail(event) -> tuple[int, int]:
        txt = f"""Новое мероприятие по вашим интересам!

    <b>{event.title}</b>

    {event.description}

    <b>Когда:</b> {event.date.strftime('%d.%m.%Y %H:%M')}

    <b>Где:</b> {event.address}

    <b>Организатор</b>: {event.organization.name}"""

        link = f"{base_link}/events/{event.id}"
        users = TelegramInformer.get_all_event_tag_subs(event)
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

    @staticmethod
    def get_all_event_tag_subs(event) -> list[int]:
        tags = event.event_tags.all()
        subs = set()
        for tag in tags:
            for sub in tag.user_tags.all():
                if sub.user.telegram_id:
                    subs.add(sub.user.telegram_id)
        return list(subs)
