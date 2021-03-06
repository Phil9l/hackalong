import logging

from aiohttp import web

from api_clients.github import GithubAPI
from api_clients.hooks.base import BaseHookHandler

logger = logging.getLogger(__name__)
LABEL_NAME = 'GITBATTLE'
LABEL_COLOR = '#22EE44'


class WebClient:
    def __init__(self, hook_handler: BaseHookHandler=None):
        self._hook_handler = hook_handler

    @staticmethod
    async def _repositories(request: web.Request) -> web.Response:
        token = request.rel_url.query.get('token')
        client = GithubAPI(token=token)
        result = await client.get_repositories()
        return web.json_response(result)

    @staticmethod
    async def _issues(request: web.Request) -> web.Response:
        token = request.rel_url.query.get('token')
        client = GithubAPI(token=token)
        data = request.rel_url.query
        result = await client.get_issues(data.get('owner'), data.get('repository'))
        return web.json_response(result)

    @staticmethod
    async def _user(request: web.Request) -> web.Response:
        token = request.rel_url.query.get('token')
        client = GithubAPI(token=token)
        result = await client.get_user_information()
        return web.json_response(result)

    @staticmethod
    async def _register(request: web.Request) -> web.Response:
        token = request.rel_url.query.get('token')
        client = GithubAPI(token=token)
        data = request.rel_url.query
        result = await client.create_hook(data.get('owner'), data.get('repository'))
        return web.json_response(result)

    @staticmethod
    async def _select_issue(request: web.Request) -> web.Response:
        token = request.rel_url.query.get('token')
        client = GithubAPI(token=token)
        data = request.rel_url.query
        owner, repository, issue, score = data.get('owner'), data.get('repository'), data.get('issue'), \
                                          data.get('score')
        await client.try_create_label(owner, repository, LABEL_NAME, LABEL_COLOR)
        await client.try_create_label(owner, repository, f'{LABEL_NAME}-{score}', LABEL_COLOR)
        await client.add_label(owner, repository, issue, [f'{LABEL_NAME}-{score}', LABEL_NAME])

        return web.json_response({'result': 'ok'})

    async def _hook(self, request: web.Request) -> web.Response:
        try:
            await self._hook_handler(request)
            return web.json_response({'result': 'ok'})
        except:
            logger.exception('Error while handling hook')
            return web.json_response({'result': 'error'})

    def start(self, hostname: str='localhost', port: int=8080) -> None:
        app = web.Application()
        app.add_routes([
            web.get('/api/issues', self._issues),
            web.get('/api/issues/select', self._select_issue),
            web.get('/api/repositories', self._repositories),
            web.get('/api/user', self._user),
            web.get('/api/register', self._register),
            web.post('/hook', self._hook)
        ])
        web.run_app(app, host=hostname, port=port)
