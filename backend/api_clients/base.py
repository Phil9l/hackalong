import abc
from typing import Dict

import aiohttp


class BaseAPI(metaclass=abc.ABCMeta):
    BASE_URL = ''

    def __init__(self):
        self.headers = {}

    async def _make_request(self, method: str, url: str, params: Dict[str, str]=None, data: Dict[str, str]=None):
        if not params:
            params = {}
        full_url = self.BASE_URL + url
        async with aiohttp.ClientSession(headers=self.headers) as session:
            async with getattr(session, method)(full_url, params=params, data=data) as resp:
                return await resp.json()
