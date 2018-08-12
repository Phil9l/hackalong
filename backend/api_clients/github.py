from api_clients.base import BaseAPI


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
        return await self._make_request('get', f'/repos/{owner}/{repository}/hooks', data={
            'name': 'web',
            'config': {
                'url': 'http://142.93.162.177:8080/hook',
                'content_type': 'json',
            },
            'events': ['issues'],
            'active': True,
        })