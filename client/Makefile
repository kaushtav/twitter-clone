build-dev:
	docker build -t client-dev -f Dockerfile .

build-local:
	docker build \
    		-t client-prod:local \
    		--build-arg CADDYFILE=Caddyfile.local \
    		--build-arg BASE_URL=http://localhost:4000/ \
    		-f Dockerfile.prod .

build-prod:
	docker build -t client-prod -f Dockerfile.prod .