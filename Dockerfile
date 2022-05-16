# STAGE: Development setup
FROM node:14.19.1-alpine3.14 AS dev-setup
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app/
CMD ["npm", "run", "seed"]

#STAGE: Development
FROM dev-setup AS dev
EXPOSE 3333
WORKDIR /app
COPY --from=dev-setup /app ./
CMD ["npm", "run", "start_dev"]

#STAGE: Production builder
FROM node:14.19.1-alpine3.14 as builder
WORKDIR /app
COPY --from=dev /app /app
RUN ["npm", "run", "build"]

#STAGE: Production dependencies builder
FROM node:14.19.1-alpine3.14 AS prod-dependencies
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install --prod

##STAGE: Production deploy ready image
FROM node:14.19.1-alpine3.14 AS prod
EXPOSE 3333
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=prod-dependencies /app/node_modules /app/node_modules
CMD ["node", "./dist/app.js"]
