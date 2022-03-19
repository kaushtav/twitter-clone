build-dev:
	docker build -t client-dev -f Dockerfile .

build-local:
	docker build \
    		-t client-prod:local \
    		--build-arg CADDYFILE=Caddyfile.local \
    		--build-arg BASE_URL=http://localhost:4000/ \
    		-f Dockerfile.prod .

build-production:
	docker build \
		-t client-prod:prod \
		--build-arg CADDYFILE=Caddyfile.prod \
		--build-arg BASE_URL=https://13.233.216.132/api \
		-f Dockerfile.production .