
WEBAPP_NODE_VERSION := 18
RUNTIME_NODE_VERSION := 18

nvm:
	export NVM_DIR="${HOME}/.nvm"

npm: nvm
	. ${NVM_DIR}/nvm.sh && nvm exec ${RUNTIME_NODE_VERSION} npm $(command)

npm-webapp: nvm
	. ${NVM_DIR}/nvm.sh && nvm exec ${WEBAPP_NODE_VERSION} npm $(command) --prefix webapp

npm-run:
	make npm command="run $(command)"

npm-run-webapp:
	make npm-webapp command="run $(command)"

install-front:
	make npm-webapp command=install

install:
	make npm command=install

install-all: install install-front

run:
	make npm-run command=dev

.PHONY: test
test:
	make npm-run command=test

test-front:
	make npm-run-webapp command=test:unit

coverage-front:
	make npm-run-webapp command=coverage

build-front:
	make npm-run-webapp command=build

run-front:
	make npm-run-webapp command=dev

deploy:
ifndef env
	$(error env value missing. Use: make deploy env={dev|au|pro} project={project})
else
ifndef project
	$(error project value missing. Use: make deploy env={dev|au|pro} project={project})
else
	gcloud builds submit --substitutions _BBVA_GAE_ENV=$(env) --project=$(project) --config=cloudbuild.yaml --ignore-file=.gcloudignore .
endif
endif
