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

cat <<MYSQLCONF > /etc/mysql/mysql.conf.d/99-local-bind.cnf
[mysqld]
bind-address = ${MYSQL_BIND_ADDRESS}
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
