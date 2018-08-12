#!/usr/bin/env python3

import asyncio

from api_clients.github import GithubAPI
from api_clients.hooks.github import GithubHookHandler
from web.client import WebClient


async def debug():
    print(await api.get_issues('phil9l', 'vk-charts'))

if __name__ == '__main__':
    api = GithubAPI()
    hook_handler = GithubHookHandler()
    wc = WebClient(hook_handler=hook_handler)
    wc.start('0.0.0.0', 8080)
    # loop = asyncio.get_event_loop()
    # hook_handler = GithubHookHandler()
    # loop.run_until_complete(wc.start('0.0.0.0', 8080, hook_handler=hook_handler))
    # loop.close()
