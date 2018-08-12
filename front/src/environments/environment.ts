// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://172.21.145.244:8080',
  mockAnyRequestAsGet: false,
  apiUrls: {
    contests: {
      all: '/contests/all.json'
    },
    issues: '/api/issues',
    repositories: '/api/repositories',
    user: '/api/user'
  },
  auth: {
    tokenKey: 'AUTH_TOKEN'
  },
  firebase: {
    apiKey: 'AIzaSyAjPYQBCOs6F8MtW-A3coEMkyT3leKhTkY',
    authDomain: 'hackalong-2018-2f913.firebaseapp.com',
    databaseURL: 'https://hackalong-2018-2f913.firebaseio.com',
    projectId: 'hackalong-2018-2f913',
    storageBucket: 'hackalong-2018-2f913.appspot.com',
    messagingSenderId: '1059177428180'
  }
};
