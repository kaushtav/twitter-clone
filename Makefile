### DEV

build-dev:
	cd client && $(MAKE) build
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose.yaml up

### LOCAL (prod config)


build-production:
	cd client && $(MAKE) build
	cd server && $(MAKE) build

run-production:
	docker-compose -f docker-compose-production.yaml up

stop:
	docker-compose down
