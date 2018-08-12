import abc

from aiohttp import web


class BaseHookHandler(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    async def __call__(self, request: web.Request) -> None:
        pass
