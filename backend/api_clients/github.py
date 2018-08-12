import logging
from typing import Iterable

from api_clients.base import BaseAPI

logger = logging.getLogger(__name__)


class GithubAPI(BaseAPI):
    BASE_URL = 'https://api.github.com'

    def __init__(self, token=None) -> None:
        super().__init__()
        if token:
            self.headers = {'Authorization': f'token {token}'}

    async def get_repositories(self) -> None:
        return await self._make_request('get', '/user/repos',
                                        {'visibility': 'public', 'affiliation': 'owner', 'sort': 'updated'})

    async def get_issues(self, owner: str, repository: str) -> None:
        return await self._make_request('get', f'/repos/{owner}/{repository}/issues', {'sort': 'updated'})

    async def get_user_information(self) -> None:
        return await self._make_request('get', '/user')

    async def create_hook(self, owner: str, repository: str) -> None:
        return await self._make_request('post', f'/repos/{owner}/{repository}/hooks', data={
            'name': 'web',
            'config': {
                'url': 'http://142.93.162.177:8080/hook',
                'content_type': 'json',
            },
            'events': ['issues'],
            'active': True,
        })

    async def try_create_label(self, owner: str, repository: str, label_name: str, label_color: str):
        try:
            return await self._make_request('post', f'/repos/{owner}/{repository}/labels', data={
                'name': label_name,
                'color': label_color,
            })
        except:
            logger.exception('Error while creating issue')

    async def add_label(self, owner: str, repository: str, issue_id: str, labels: Iterable[str]):
        return await self._make_request('post', f'/repos/{owner}/{repository}/issues/{issue_id}/labels', data=labels)
