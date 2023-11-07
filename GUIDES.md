# Guides

## How to create an express app with FGA Front

FGA Front uses a function to create the express application with a gateway connector, initializes the logger client, adds an authorization middleware, the discovery for SOYO, and if applicable adds the function that logs the request headers.
You can reference of function [here](https://platform.bbva.com/gcp/tech-doc/fga-front-nodejs-expressjs/latest/index.html "here").

Example:

```typescript
import {
  createFgaFrontExpressApp,
  IndexHandler,
} from '@gcp/fga-front-expressjs';
import * as path from 'path';
import * as express from 'express';

const publicPath = path.resolve('./public');

const app = createFgaFrontExpressApp({publicFolderPath: publicPath});

app.get('/', IndexHandler);
app.use(express.static(publicPath));
app.get('/*', IndexHandler);

export {app};
```

### How to change application the index handler
FGA Front provides a handler to serve the index.html file from the public folder. This is the IndexHander code.

```typescript
/**
 * Handler that render index.html of public folder with userSession and env variables.\
 * Use `ejs` as engine template.
 * @constructor
 */
export async function IndexHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const userSession = await getUserSessionData(res);
    const env = getEnvironment();
    res.render('index.html', {
      userSession,
      env,
    });
  } catch (e) {
    next(e);
  }
}
```
It only renders the index.html file by injecting the user's session and environment data.

This handler can be replaced by one of your own.

```typescript
import {createFgaFrontExpressApp} from '@gcp/fga-front-expressjs';
import * as path from 'path';
import * as express from 'express';

const publicPath = path.resolve('./public');

const app = createFgaFrontExpressApp({publicFolderPath: publicPath});

function MyIndexHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    res.render('index.html');
  } catch (e) {
    next(e);
  }
}

app.get('/', MyIndexHandler);
app.use(express.static(publicPath));
app.get('/*', MyIndexHandler);

export {app};
```

### How to add endpoints to express app

Easy
```typescript
app.get(
  '/session',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userSession = await getUserSessionData(res);
      res.json(userSession);
    } catch (e) {
      next(e);
    }
  }
);
```

## How to get user session data from webapp

index.html is rendered with 2 global variables with user session data and environment data

```html
<script type="text/javascript">
    window.USER_SESSION = {};
    window.ENVIRONMENT = "dev";
</script>
```
This data can be easily accessed from the javascript application.

```javascript
console.log(window.USER_SESSION);
```

## How to call to gateway from webapp

The application created has in the path `/gateway/{api-alias}/{api-path}` a connector to call Api Gateway in a simple way.
It acts as a proxy adding the necessary headers to be able to make the call safely.
No extra connectors need to be defined in the application properties.

Suppose that from the front application you want to call a userinfo endpoint, and it must always be through the gateway.

For example this `https://dev-bbva-gateway.appspot.com/userinfo/s/user/detail?uid=XXXXX`
So, from the javascript application on the front, we have to make the following call:

```javascript
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/gateway/userinfo/s/user/detail?uid=XXXXX')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```
A more common example is calling from the front to the back of the application.

If we have this data:
 - endpoint: `/v1/users`
 - api alias en gateway: `my-back`

to make the call we must call this route:

```javascript
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/gateway/my-back/v1/users')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

### How to expand user session data

When creating the application you can pass a function in parameter `onSaveSession`. Must be a type `onSaveSession` function. This function will be executed every time the session is requested from Gprofile

Example:

```typescript
import {createFgaFrontExpressApp} from '@gcp/fga-front-expressjs'
import {Session} from '@gcp/fga';
import * as path from 'path';

function expandUserSessionData(session: Session) {
  return Object.assign({}, session, {
    role: session.groups?.['app.admin.group@dev.bbva.com'] ? 'admin' : 'user',
  });
}

const publicPath = path.resolve('./public');

const app = createFgaFrontExpressApp({
  publicFolderPath: publicPath,
  // example of how to expand user's session object
  onSaveSession: expandUserSessionData,
});
```

### How to pass a dynamic list of groups or fellows

At the time of requesting the session user's data you can send a list of groups, or fellows, dynamic

Example:

```typescript
import {getSessionGroupsOrFellows} from '@gcp/fga';
import {createFgaFrontExpressApp} from '@gcp/fga-front-expressjs'
import * as path from 'path';

//
const getSessionGroups: getSessionGroupsOrFellows = email => [
  'user.app.group@dev.bbva.com',
];
const getSessionFellows: getSessionGroupsOrFellows = email => ['@app-admin'];

const publicPath = path.resolve('./public');

const app = createFgaFrontExpressApp({
  publicFolderPath: publicPath,
  getSessionGroups,
  getSessionFellows,
});
```

## How to use logger

FGA use the module [@google-cloud/logging-winston](https://github.com/googleapis/nodejs-logging-winston#readme) that
 provides a higher-level layer for working with Stackdriver Logging, compatible with [winston](https://github.com/winstonjs/winston).

Any application logs emitted on behalf of a specific request will be shown nested inside the request log.

Examples:

```typescript
import {logger} from '@gcp/fga';

logger.info('Hello! I am an info message');
logger.warn('Hello! I am a warning message');
logger.error('Hello! I am an error message');
logger.log('info', 'Hello world! I am another info message');

logger.log('info', 'test message %s', 'my string');
logger.log('info', 'test message %d', 123);
logger.info('Found %s at %s', 'error', new Date());
logger.info(`Logging an object: ${JSON.stringify({a: 1, b: 2, c: 3})}`);
```

## How to define project's version

You can set project's version in [env.json file](env.json). fga-cli tool will use this version in deployment.

```json
{
  "project_name": "my-project-name",
  "author": "GCP Team",
  "pro": {
    "project": "bbva-my-project-name",
    "version": "0-1-0"
  },
  "dev": {
    "project": "dev-bbva-my-project-name",
    "version": "0-2-0-beta"
  },
  "au": {
    "project": "au-bbva-my-project-name",
    "version": "0-1-0"
  },
  "type": "backend",
  "runtime": "nodejs10"
}
```

## How to use jinja in environment templates

For example if you want distincts crons per environment, you can write the file as bellow:

```yaml
cron:

{% if env=='dev' %}
- description: dev cron
  url: /cron/dev
  schedule: every day 07:00
  timezone: Europe/Madrid
{% endif %}

{% if env=='pro' %}
- description: production cron
  url: /cron/pro
  schedule: every day 07:00
  timezone: Europe/Madrid
{% endif %}
```

## How to use Properties System

You can define properties for each of the environments: `local`, `dev.bbva.com`, `au.bbva.com` and `bbva.com`.

The properties are defined in the file `./properties/<envFolder>/properties.json`.
For example, the path for the `dev` environment is
[`./properties/dev.bbva.com/properties.json`](./properties/dev.bbva.com/properties.json)

Example properties file:

```json
{
  "session": {
    "groups": [],
    "fellows": []
  },
  "soyo": {
    "roles": false
  },
  "iap": {
    "clientId": ""
  },
  "logging": {
    "headers": true
  }
}
```

You can get a property value

```typescript
import {getProperty} from '@gcp/fga';
const example = getProperty('example');
const loggingHeaders = getProperty('logging.headers');
```

Note: the property object is flatten.

### Properties defined

- `session.groups` In the user session data it will be specified if the user is a member of these groups
- `session.fellows` In the user session data it will be specified if the user is a member of these fellowships
- `session.expiration` Expiration time of user session data. In seconds. Default: 1 day.
- `soyo.roles` In the user session data it will be specified user's roles
- `iap.ClientId` ClientId of IAP. It is necessary for to use the internalRequest method. GCP Team will give this value.
- `logging.headers` if true, the request headers will be logged.
- `gateway.tokenCacheLifeTime` Gateway token cache lifetime

## How to get user session email and data

This function must be executed in the controller because need the Express Response object.
Example

```typescript
import * as express from 'express';
import {createFgaFrontExpressApp} from '@gcp/fga-front-expressjs'
import {
  getUserSessionEmail,
  getUserSessionData,
} from '@gcp/fga';

const publicPath = path.resolve('./public');

const app = createFgaFrontExpressApp({
  publicFolderPath: publicPath,
});

app.get('/', async (req: express.Request, res: express.Response) => {
  const userSessionEmail = getUserSessionEmail(res);
  const userSessionData = await getUserSessionData(res);
  res.json({userSessionEmail, userSessionData});
});
```

### How to know if the session user is a member of a group or a fellow

Gprofile returns if the session user is a member of a group or a fellow. You need to define the list of groups or
fellows.
There are 2 options:

- Defined in the [properties](#properties-defined) (Recommended option for a fixed list)
- [Using `getSessionGroups` and `getSessionFellows`](#how-to-pass-a-dynamic-list-of-groups-or-fellows) for a dynamic list.

Then, in the session user data, in the groups property you can see the membership.

Example:

```typescript
const userIsAdmin = session.groups?.['app.admin.group@dev.bbva.com'];
const userIsSuperAdmin = session.fellowships?.['@app-super-admin'];
```

## How to make a request

FGA makes authenticated requests using a wrapper over [gaxios.request](https://github.com/googleapis/gaxios#example).

## How to make a request to Gateway

Example:

```typescript
import {logger, gatewayRequest} from '@gcp/fga';

async function exampleGatewayRequest(requestor: string) {
  try {
    const gatewayResponse = await gatewayRequest({
      requestor,
      url: '/user-info/v1/users',
      method: 'POST',
      data: {a: 1, b: 2, c: 3},
    });
    logger.info(JSON.stringify(gatewayResponse));
  } catch (e) {
    logger.error(e);
  }
}
```

## How to make a request to another internal service

**Note**: It is necessary to have defined in the [properties iap.clientId](#properties-defined)

Example:

```typescript
import {logger, internalRequest} from '@gcp/fga';

async function exampleInternalRequest(requestor: string) {
  // make an internal request with axios interface
  try {
    const internalResponse = await internalRequest({
      requestor,
      url: 'https://version-dot-my-project.ew.r.appspot.com/users',
      method: 'GET',
    });

    logger.info('Internal response:');
    logger.info(JSON.stringify(internalResponse));
  } catch (e) {
    logger.warn('Error making an internal request');
    logger.error(e);
  }
}
```

## How to get environment

```typescript
import {getEnvironment} from '@gcp/fga';

const env = getEnvironment();
```

### How to know if environment is local development

```typescript
import {isLocalDevelopment} from '@gcp/fga';

if (isLocalDevelopment()) {
  console.log('local!!');
}
```

## How to use BaseError

BaseError is a helper for inspired by the [Google API Design Guide](https://cloud.google.com/apis/design/errors#top_of_page)

Example with constructor

```typescript
import {BaseError, ErrorCode, ErrorStatus} from '@gcp/fga';

throw new BaseError({
  message: 'Error Base',
  code: ErrorCode.INTERNAL,
  status: ErrorStatus.INTERNAL,
});
```

Example with errors defined

```typescript
import {BaseError} from '@gcp/fga';

const notFoundError = BaseError.createNotFoundError('User not found');

const error = BaseError.createInvalidArgumentError('Invalid arguments', [
  {id: 'id must be number'},
]);
console.log(error.toString());
console.log(error.toObject());
```


