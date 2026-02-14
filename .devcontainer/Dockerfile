# 使用するベースイメージ
FROM mcr.microsoft.com/devcontainers/javascript-node:24

# ロケールの設定
RUN apt-get update && apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
    rm -rf /var/lib/apt/lists/*
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8

# 作業ディレクトリを設定
WORKDIR /workspaces
