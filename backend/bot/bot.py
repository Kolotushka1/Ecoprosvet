import os

from aiogram import Bot, Dispatcher, Router
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from handlers import r
from middleware import DatabaseMiddleware


bot = Bot(token=os.getenv('BOT_TOKEN'))
dp = Dispatcher()
dp.include_router(r)
eng = create_engine(os.getenv('DB_URI'))
dp.update.outer_middleware(DatabaseMiddleware(sessionmaker=sessionmaker(bind=eng)))
dp.run_polling(bot=bot)
