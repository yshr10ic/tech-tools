FROM node:lts-alpine

WORKDIR /opt

RUN yarn global add \
    @vue/cli
