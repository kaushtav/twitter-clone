### DEV

build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build-dev

run-dev:
	docker-compose -f docker-compose-dev.yaml up

### LOCAL (prod config)


build-prod:
	cd client && $(MAKE) build-prod
	cd server && $(MAKE) build-prod

run-prod:
	docker-compose -f docker-compose-prod.yaml up -d

stop:
	docker-compose down
