# ビルド用のコンテナ
FROM node:16-alpine as builder

WORKDIR /app

# Copy dependency definitions
COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build


# 実行用のコンテナ
FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /app

# bring files from the previous build step
COPY --from=builder /app /app

# The EXPOSE instruction does not actually publish the port.
# To actually publish the port when running the container, 
# use the -p flag on docker run to publish and map one or more ports, 
# or the -P flag to publish all exposed ports and map them to high-order ports.
ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080

# RUN chmod 744 run.sh
# RUN chmod 744 env.sh
ENTRYPOINT [ "npm", "run", "dev" ]

# Env.shと同プロセスでサーバ構築を実行するようなdockerコンテナを作成しても，デプロイ時に要するenv.shがgithub上にないので，ワークフローでコンテナをラン＆アップすると時に実行エラーが出る気がしないでもない
# docker run -dt -p 8080:8080 -e WATCHPACK_POLLING=true -v PWD:/app/src --name moviefun-lts moviefun-lts