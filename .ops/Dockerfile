FROM node:latest

WORKDIR /app

COPY package.json yarn.lock app/

RUN yarn --pure-lockfile

COPY . /app

CMD [ "yarn", "dev" ]
