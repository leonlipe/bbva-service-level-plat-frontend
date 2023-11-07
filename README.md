# BBVA FGA Front VueJs Archetype for NodeJs

version: 1.1.0

An archetype based in ExpressJs to create BBVA FrontEnd Applications deployed on Google App Engine using [NodeJS
 Environment](https://cloud.google.com/appengine/docs/standard/nodejs)

- [FGA Front Express Reference](https://platform.bbva.com/gcp/tech-doc/fga-front-nodejs-expressjs/latest/index.html)
- [FGA NodeJs Reference](https://platform.bbva.com/gcp/tech-doc/fga-nodejs/latest/index.html)
- [FGA NodeJs Documentation](https://platform.bbva.com/gcp/documentation/1UaytYVL_7RkdTHAKWr9zmMHc1703qP29dqFjprsBGSc/technical-documentation/frameworks/fga-core/runtimes/nodejs/getting-started)

### Build status

* master

[![Quality Gate Status](https://globaldevtools.bbva.com/sonar-lts/api/badges/gate?key=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Amaster)](https://globaldevtools.bbva.com/sonar-lts/dashboard?id=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Amaster)
[![Coverage](https://globaldevtools.bbva.com/sonar-lts/api/badges/measure?key=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Amaster&metric=coverage)](https://globaldevtools.bbva.com/sonar-lts/dashboard?id=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Amaster)
[![New Coverage](https://globaldevtools.bbva.com/sonar-lts/api/badges/measure?key=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Amaster&metric=new_coverage)](https://globaldevtools.bbva.com/sonar-lts/dashboard?id=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Amaster)

* develop

[![Quality Gate Status](https://globaldevtools.bbva.com/sonar-lts/api/badges/gate?key=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Adevelop)](https://globaldevtools.bbva.com/sonar-lts/dashboard?id=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Adevelop)
[![Coverage](https://globaldevtools.bbva.com/sonar-lts/api/badges/measure?key=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Adevelop&metric=coverage)](https://globaldevtools.bbva.com/sonar-lts/dashboard?id=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Adevelop)
[![New Coverage](https://globaldevtools.bbva.com/sonar-lts/api/badges/measure?key=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Adevelop&metric=new_coverage)](https://globaldevtools.bbva.com/sonar-lts/dashboard?id=GCPA%3Afga-front-base-archetype-nodejs-expressjs-no-cli%3Adevelop)

## Prerequisites

- [Google DEV account for DEV environment](https://platform.bbva.com/gcp/documentation/1Et3h3LJibvYtQ5EVStNFcfuMzOWE86MRb55dYHljiYk/guides/dev-environment-user)
- gcloud installed and configured
  * `gcloud auth application-default login` with dev.bbva.com account
  * `gcloud config set project <project_id>`
- [nvm](https://github.com/nvm-sh/nvm#intro) as node version manager.
- Node versions required must be installed with nvm. In this case 18. Example: `nvm install 18`
- npm credentials. [Documentation](https://platform.bbva.com/gcp/documentation/1PSASTWUqx6yLj2YKgZkcGczcfOLLlt_KGjmCBxu0ZFQ/developer-tools/artifactory#h.inv1mxjegjvb). [Example](#npmrc-file)

## Features

- Built with [TypeScript](https://www.typescriptlang.org/)
- Built following [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- Based in [Express.js](https://expressjs.com/)
- Separated Express 'app' and 'server'
- TypeScript guide, formatter and linter provides for [GTS](https://github.com/google/gts)
- Live reloading with [nodemon](https://nodemon.io/)
- Test with [jest](https://jestjs.io/)
- Documentation generated with [TypeDoc](https://typedoc.org/)
- Require IAP activated

## What provides @gcp/fga-front-express?
- Function to create ExpressJs applications using `@gcp/fga` with next features:
  - Same features that applications created with `@gcp/fga`
  - **Gateway connector** to call Api Gateway easily
- `IndexHandler` that render index.html with session data using `ejs` template engine

### Gateway connector

The application created has in the path `/gateway/{api-alias}/{api-path}` a connector to call Api Gateway in a simple way.
It acts as a proxy adding the necessary headers to be able to make the call safely.
No extra connectors need to be defined in the application properties.

#### How to use
Suppose that from the front application you want to call a userinfo endpoint, and it must always be through the gateway.
For example this https://dev-bbva-gateway.appspot.com/userinfo/s/user/detail?uid=XXXXX
So, from the javascript application on the front, we have to make the following call:
```bash
/gateway/userinfo/s/user/detail?uid=XXXXX
```
A more common example is calling from the front to the back of the application.
If we have this data:
 - endpoint: `/v1/users`
 - api alias en gateway: `my-back`

to make the call we must call this route:
```bash
/gateway/my-back/v1/users
```


## What provides @gcp/fga?

- **Properties**. You can define properties in folder `./properties/<env-folder>`.
- **Session**. To be able to obtain the data of the user session by calling the `getUserSessionData` function.
- **Gateway Client**. A function to call Gateway easily.
- **Internal Request Client**. A function to call another service of your project.
- Transparent **IAP token verification**
- The path `/fga/discovery` discovers all the endpoints of the project
- Errors helpers
- Logging client based on [winston](https://github.com/winstonjs/winston)

## Environment templates

In the folder `deployables` you have the Google App Engine yaml files needed to deploy some of their services as Task Queues, Dispatch rules, cron Jobs, etc…

You have three folders, once for each environment (`dev`, `au` and `pro`).

## Makefile

In the Makefile you can find different commands that help with the archetype tasks. These commands can be adapted to the needs of each project, or even not used at all.

Since the archetype has 2 projects with node, one the GAE project, the other the javascript application project, you may need to constantly change the nodejs version. For example the GAE application uses version 18 while the front end application uses version 18.

This file defines the versions:
```makefile
WEBAPP_NODE_VERSION := 18
RUNTIME_NODE_VERSION := 18
```

To change nodejs version you need nvm.

All the commands in the makefile can be executed directly in console. It is only a help file.

## env.js file

The purpose of the env.js file is to establish headers similar to the gae production environment when running in development mode.

## Install dependencies

The archetype has two parts: the gae server and the javacsript application. Both parts have their own dependencies. The GAE server dependencies are defined in the `./package.json` file and the javascript application dependencies are defined in the `./webapp/package.json` file.

You can install the dependencies of both parts with the following command
```bash
make install-all
```
If you only need to install the GAE server dependencies run the following command
```bash
make install
```
Otherwise, if you only want to install the dependencies of the front part, you have to execute this command
```bash
make install-front
```

## Running locally

The archetype has two parts: the gae server and the javacsript application. Both parts have their own development server.

The GAE server side builds the production front end and serves it. It is configured, thanks to nodemon, to restart the server if it detects any change in the *.ts files in the ./src folder.

Regarding javascript applications, most modern javascript frameworks include a development server that shows you the changes when developing. It is recommended to develop this way.

### GAE server

Thanks to the env.js file, a development environment similar to the GAE production environment is emulated.

```bash
make run
```

#### Live reloading

[Nodemon](https://nodemon.io/) is a utility that will monitor for any changes in your front-back app source and automatically restart your server. Perfect for development.

**Note**: Don't monitor changes in `./webapp` source.

Configuration file: [nodemon.json](nodemon.json)

Official documentation [here](https://github.com/remy/nodemon#config-files)

### Javascript App - Hot reloading (Recommended)

The developer gets more experience in a development environment that shows the changes automatically. For this reason it is recommended to use this mode.

[Here](https://platform.bbva.com/gcp/documentation/1PBmuyZy11YV25kEC-PqJnfS07FYBPVqPrU2-F495qaE/technical-documentation/frameworks/fga-cli-ng/hot-reloading-for-fga-framework#h.uud066ff6vz3) you can see an extensive documentation where to understand the problem and use hot reloading.

## Guides

You can see all guides [in ./GUIDES.md](GUIDES.md)

## Deploy

To deploy the application there is a command in make.

```bash
make deploy env={dev|au|pro} project={project-id}
```

### Deploy only app

When the app is deployed, the app is packaged and cloud build does the rest.

```bash
make deploy env={dev|au|pro} project={project-id}
```

### Deploy only queue
```bash
gcloud app deploy deployables/{dev}/queue.yaml
```

### Deploy only datastore indexes
```bash
gcloud app deploy deployables/{dev}/index.yaml
```

### Deploy only cron jobs
```bash
gcloud app deploy deployables/{dev}/cron.yaml
```

### Deploy only dispatch configuration
```bash
gcloud app deploy deployables/{dev}/dispatch.yaml
```

### Notes:

- At deployment, before starting your application, GAE runs `npm run gcp-build` to, in this case, transpile the typescript code. [Official documentation](https://cloud.google.com/appengine/docs/standard/nodejs/running-custom-build-step).

- GAE starts the application by executing the command `npm start`. [Official guide](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/deploying-web-service)

### [.gcloudignore](.gcloudignore) file

You can use a [.gcloudignore](.gcloudignore) file to specify files and directories that will not be uploaded to App Engine when you deploy your services. This is useful for ignoring build artifacts and other files that do not need to be uploaded with your deployment.

## Tests

### GAE server

For GAE server, and then run the command `make test`.

```bash
make test
```

Configuration file: [jest.config.js](jest.config.js)

Jest Configuration reference [here](https://jestjs.io/docs/en/configuration)

### webapp

You can run the javascript application tests with this command, assuming that the task running the tests is named `test:unit`.

```bash
make test-front
```

## Compile code

Compiles the source code using TypeScript compiler.

```bash
make npm-run command=compile
```

## GTS

[GTS](https://github.com/google/gts) is Google's TypeScript style guide, and the configuration for our formatter, linter, and automatic code fixer.

### Check code

Lints and checks for formatting problems.

```bash
make npm-run command=check
```

### Fix code

Automatically fixes formatting and linting problems (if possible).

```bash
make npm-run command=fix
```

### Clean code

Removes output files.

```bash
make npm-run command=clean
```

## Build docs

```bash
make npm-run command=docs
```

Configuration file: [typedoc.json](typedoc.json)

TypeDoc options reference [here](https://typedoc.org/guides/options/)

## Versioning

GCP recommend follows [Semantic Versioning](http://semver.org/).

## Change log

See [CHANGELOG](CHANGELOG.md).

## Support

For any problem or bug, please contact with BBVA Google Cloud Platform Team following this [template](https://platform.bbva.com/gcp/documentation/1u80anICjn_zifhlN3IM4dyuutbNuCEnl682jU4B1h_M/procedures/issue-support-request).


## Examples

### `~/.npmrc` file

```text
registry=https://registry.npmjs.org/

@gcp:registry=https://artifactory.globaldevtools.bbva.com/artifactory/api/npm/gl-gcp-global-npm-local/
//artifactory.globaldevtools.bbva.com/artifactory/api/npm/gl-gcp-global-npm-local/:_password=API_KEY_BASE64==
//artifactory.globaldevtools.bbva.com/artifactory/api/npm/gl-gcp-global-npm-local/:username=USERNAME
//artifactory.globaldevtools.bbva.com/artifactory/api/npm/gl-gcp-global-npm-local/:email=USERNAME_EMAIL
//artifactory.globaldevtools.bbva.com/artifactory/api/npm/gl-gcp-global-npm-local/:always-auth=true
```
