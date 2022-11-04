
dc-frontend:
	docker-compose stop frontend
	docker-compose build frontend
	docker-compose up -d frontend

dc-envoy:
	docker-compose stop envoy
	docker-compose build envoy
	docker-compose up -d envoy

dc-time:
	docker-compose stop time-server
	docker-compose build time-server
	docker-compose up -d time-server

dc-stop:
	docker-compose

proto:
	@echo "--> Generating gRPC clients"
	@protoc \
		-I envoy_time/api \
		--go_out="paths=source_relative:envoy_time/time/goclient" \
		--go-grpc_out="paths=source_relative:envoy_time/time/goclient" \
		--js_out="import_style=commonjs:assets/jsclient" \
		--grpc-web_out="import_style=commonjs,mode=grpcwebtext:assets/jsclient" \
		envoy_time/api/time/v1/time_service.proto \
		envoy_time/api/timestamp/timestamp.proto

dev:
	npm run dev
