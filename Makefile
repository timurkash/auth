
dc-envoy:
	docker-compose stop envoy
	docker-compose build envoy
	docker-compose up -d envoy
