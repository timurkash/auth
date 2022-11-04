# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:lts as production-stage
WORKDIR /app
COPY --from=build-stage /app  .
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "npm", "run", "start" ]
