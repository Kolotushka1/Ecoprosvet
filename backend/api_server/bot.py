import asyncio
import os
from aiogram import Bot, Dispatcher
from dotenv import load_dotenv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


async def main():
    from bot_src.handlers import r
    load_dotenv()
    bot = Bot(token=os.getenv('BOT_TOKEN'))
    dp = Dispatcher()
    dp.include_router(r)
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
