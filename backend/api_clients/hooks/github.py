import logging

from api_clients.hooks.base import BaseHookHandler

from aiohttp import web

logger = logging.getLogger(__name__)


class GithubHookHandler(BaseHookHandler):
    async def __call__(self, request: web.Request) -> None:
        logger.info(request)
