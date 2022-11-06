# auth

Project for demonstration of
- authorization via Keycloak
- web-grpc applying from front to back

### using

To starting Keycloak run

```bash
docker-compose -f keycloak-compose.yml up -d
```
then you have to set up the keycloak

To start front, envoy, time-server run

```bash
dicker-compose up -d 
```

To develop the front, `npm run dev` or `yarn dev`

Environments have to be set in `.env`

for time-server

- API_URL

for keycloak
- KEYCLOAK_URL
- REALM
- CLIENT
- CLIENT_SECRET
