#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-mysql] root 権限で実行してください。" >&2
  exit 1
fi

: "${MYSQL_ROOT_PASSWORD:?MYSQL_ROOT_PASSWORD が未設定です}"
: "${MYSQL_APP_DB:?MYSQL_APP_DB が未設定です}"
: "${MYSQL_APP_USER:?MYSQL_APP_USER が未設定です}"
: "${MYSQL_APP_PASSWORD:?MYSQL_APP_PASSWORD が未設定です}"
: "${MYSQL_BIND_ADDRESS:?MYSQL_BIND_ADDRESS が未設定です}"

export DEBIAN_FRONTEND=noninteractive
apt-get install -y mysql-server mysql-client
systemctl enable --now mysql

cat <<MYSQLCONF > /etc/mysql/mysql.conf.d/99-custom.cnf
[mysqld]
bind-address = ${MYSQL_BIND_ADDRESS}
port = 3306
mysqlx = OFF
skip-name-resolve = ON
character-set-server = utf8mb4
collation-server = utf8mb4_0900_ai_ci
# MySQL 8.0 のデフォルトに近い sql_mode。NO_ZERO_* は 0 日付を拒否、ONLY_FULL_GROUP_BY は集約の厳格化。
# NO_AUTO_CREATE_USER は MySQL 8.0 で削除されているため含めない。
sql_mode = STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION,NO_ZERO_IN_DATE,NO_ZERO_DATE,ONLY_FULL_GROUP_BY
innodb_buffer_pool_size = 256M
innodb_buffer_pool_instances = 1
innodb_flush_method = O_DIRECT
innodb_flush_log_at_trx_commit = 1
innodb_log_buffer_size = 16M
max_connections = 60
wait_timeout = 300
interactive_timeout = 300
table_open_cache = 400
thread_cache_size = 16
tmp_table_size = 32M
max_heap_table_size = 32M
sort_buffer_size = 1M
join_buffer_size = 1M
read_buffer_size = 256K
read_rnd_buffer_size = 512K
log_error = /var/log/mysql/error.log
log_error_verbosity = 2
log_output = FILE
slow_query_log = ON
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 0.5
# log_queries_not_using_indexes は OFF にして短時間クエリの過剰記録を避ける
log_queries_not_using_indexes = OFF
general_log = OFF
general_log_file = /var/log/mysql/general.log
MYSQLCONF

if command -v mysqld >/dev/null 2>&1; then
  if ! mysqld --validate-config >/dev/null 2>&1; then
    echo "[10-mysql] MySQL 設定の検証に失敗しました。ログを確認してください。" >&2
  fi
fi

systemctl restart mysql

if ! command -v mysql >/dev/null 2>&1; then
  echo "[10-mysql] mysql クライアントが見つかりません。mysql-client のインストールに失敗しています。" >&2
  exit 1
fi

MYSQL_CMD="mysql --protocol=socket"
if [ -f /root/.my.cnf ]; then
  MYSQL_CMD="mysql --defaults-extra-file=/root/.my.cnf"
fi

$MYSQL_CMD <<SQL
-- caching_sha2_password を前提とする（旧クライアント互換が必要な場合は要調整）
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
DELETE FROM mysql.user WHERE User='';
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
-- MySQL 専用のバッククォートは DB 名で使用する
CREATE DATABASE IF NOT EXISTS \`${MYSQL_APP_DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${MYSQL_APP_USER}'@'localhost' IDENTIFIED BY '${MYSQL_APP_PASSWORD}';
GRANT ALL PRIVILEGES ON \`${MYSQL_APP_DB}\`.* TO '${MYSQL_APP_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

cat <<ROOTCNF > /root/.my.cnf
[client]
user=root
password=${MYSQL_ROOT_PASSWORD}
ROOTCNF
chmod 600 /root/.my.cnf
