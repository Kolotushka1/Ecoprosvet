import asyncio
import os
from aiogram import Bot, Dispatcher
from dotenv import load_dotenv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


async def main():
    from bot_src.routers.public import r as public_router
    from bot_src.routers.account import r as account_router
    load_dotenv()
    bot = Bot(token=os.getenv('BOT_TOKEN'))
    dp = Dispatcher()
    dp.include_router(account_router)
    dp.include_router(public_router)
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
