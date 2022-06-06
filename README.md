# SSO Consents :convenience_store:

[![JS Hotmart Style](https://img.shields.io/badge/code%20style-hotmart-F04E23.svg)](https://www.npmjs.com/package/eslint-config-hotmart)

## Installation

- Download and Install [Git](http://git-scm.com);
- Download and Install [NodeJS - npm](http://nodejs.org);
- Create on the root of project a `.env` file with the fields:

```
PRODUCTION=false
API_LANGUAGES=
APP_PLATFORM=
SECURITY_BASE_URL=
SECURITY_USERNAME=
SECURITY_PASSWORD=
AUTH_CLIENT_SECRET=
```

_Consult the owners of the project to get the values to this keys_

## Running

Installing components:

```sh
npm install
```

Downloading labels in api-languages:

```sh
npm run local-lang
```

_The labels are downloaded automatically, when the application is started_ _Remember to log in on the VPN to get access to api-languages_

Starting on development mode:

To execute this project locally it's necessary to register the CAS's URL in your hosts file as follows:

```shell
127.0.0.1	    local.app-vulcano.buildstaging.com
```

```shell
npm start
```

So, you can access your app on [local.app-vulcano.buildstaging.com](local.app-vulcano.buildstaging.com):APP_PORT

**Do not forget to define `IS_CAS` var inside your .env file.**

By default, the project is executed using CAS authentication service. If you want to disable it, look for `IS_CAS` enviroment variable in the project and set its value to `false`.

Building the static:

```sh
npm run build
```

**Have fun coding!**

## Commits and PR's

Commits and Pull requests, preferably, is written in English with a concise message. WIP, emojis, etc is not good to legibility, help us keep this project better <3

## Strucutre

- build -> _Production ready files after `build`._;
- config -> _Configuration files of webpack, jest, languages, etc._;
- public -> _Folder to public files as index.html, favicon, etc._;
- src -> _Folder that contains all code_;
  - api -> _Folder that contains API config files_;
  - assets -> _Folder that contains icons, fonts, images, etc_;
  - components -> _Contains the components without or with a little intelligence_;
  - config -> _Contains configuration of some elements of application_;
  - context -> _Contains React context API files of application_;
  - hooks -> _Custom hooks files_;
  - languages -> _i18n files_;
  - pages -> _Routes_;
  - services -> _Functions to isolate the requests calls from components_;
  - startup -> _Components necessary to start the application_;
  - typings -> _TypeScript consts, interfaces and types_;
  - utils -> _Utilities used all over app_.

## Dependencies you should know about

- @hotmart/cosmos;
- i18next;
- react-router-dom;

## Drone URL

https://drone.vulcano.hotmart.com/Hotmart-Org/app-sso-consents

## Copyright

Hotmart &copy; 2022
