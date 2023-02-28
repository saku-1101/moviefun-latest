FROM node:14

# 必要なパッケージのインストール
RUN apt-get update && \
    apt-get install -y \
        curl \
        mecab \
        libmecab-dev \
        mecab-ipadic-utf8

# MeCabの設定
RUN echo "dicdir = /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd" > /usr/local/etc/mecabrc

WORKDIR /app

# アプリケーションのファイルをコピー
COPY package*.json ./
RUN npm install

# アプリケーションのファイルをコピー
COPY . .

# ポートを設定
EXPOSE 3000

# アプリを起動
CMD [ "node", "/app/src/core/infrastructures/getKeyword.js" ]