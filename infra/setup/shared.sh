#!/usr/bin/env bash

build_database_url() {
  if [ -n "${DATABASE_URL:-}" ]; then
    printf '%s' "$DATABASE_URL"
    return 0
  fi

  : "${MYSQL_APP_DB:?MYSQL_APP_DB が未設定です}"
  : "${MYSQL_APP_USER:?MYSQL_APP_USER が未設定です}"
  : "${MYSQL_APP_PASSWORD:?MYSQL_APP_PASSWORD が未設定です}"
  : "${MYSQL_BIND_ADDRESS:?MYSQL_BIND_ADDRESS が未設定です}"

  # 生成した DATABASE_URL はログに出力しない（資格情報を含むため）
  printf 'mysql://%s:%s@%s:3306/%s' "$MYSQL_APP_USER" "$MYSQL_APP_PASSWORD" "$MYSQL_BIND_ADDRESS" "$MYSQL_APP_DB"
}
