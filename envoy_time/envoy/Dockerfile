FROM envoyproxy/envoy:v1.26-latest

COPY envoy.yaml /etc/envoy/envoy.yaml
COPY example-com.crt /etc/ssl/certs/example-com.crt
COPY example-com.key /etc/ssl/private/example-com.key

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /dev/stdout
