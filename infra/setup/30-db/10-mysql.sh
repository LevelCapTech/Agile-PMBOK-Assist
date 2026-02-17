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
apt-get install -y mysql-server
systemctl enable --now mysql

cat <<MYSQLCONF > /etc/mysql/mysql.conf.d/99-custom.cnf
[mysqld]
bind-address = ${MYSQL_BIND_ADDRESS}
port = 3306
mysqlx = OFF
skip-name-resolve = ON
character-set-server = utf8mb4
collation-server = utf8mb4_0900_ai_ci
sql_mode = STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
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

systemctl restart mysql

MYSQL_CMD="mysql --protocol=socket"
if [ -f /root/.my.cnf ]; then
  MYSQL_CMD="mysql --defaults-extra-file=/root/.my.cnf"
fi

$MYSQL_CMD <<SQL
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}';
DELETE FROM mysql.user WHERE User='';
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
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
