from typing import Callable, Any, Awaitable

from aiogram.types import TelegramObject


class DatabaseMiddleware:
    def __init__(self, sessionmaker):
        self.sessionmaker = sessionmaker

    async def __call__(
            self,
            handler: Callable[[TelegramObject, dict[str, Any]], Awaitable[Any]],
            event: TelegramObject,
            data: dict[str, Any]
    ) -> Any:
        with self.sessionmaker() as session:
            data['session'] = session
            res = await handler(event, data)
        return res
