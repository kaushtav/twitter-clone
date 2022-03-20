### DEV

build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yaml up

### LOCAL (prod config)
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local  docker-compose -f docker-compose-prod.yaml up



build-prod:
	cd client && $(MAKE) build-prod
	cd server && $(MAKE) build

run-prod:
	ENV=prod docker-compose -f docker-compose-prod.yaml up -d

stop:
	docker-compose -f docker-compose-prod.yaml down && docker-compose -f docker-compose-dev.yaml down
