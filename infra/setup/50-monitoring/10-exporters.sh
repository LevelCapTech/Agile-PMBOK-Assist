#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-exporters] root 権限で実行してください。" >&2
  exit 1
fi

: "${MYSQL_EXPORTER_USER:?MYSQL_EXPORTER_USER が未設定です}"
: "${MYSQL_EXPORTER_PASSWORD:?MYSQL_EXPORTER_PASSWORD が未設定です}"

export DEBIAN_FRONTEND=noninteractive
apt-get install -y prometheus-node-exporter prometheus-mysqld-exporter

if [ ! -f /root/.my.cnf ]; then
  echo "[10-exporters] /root/.my.cnf が見つかりません。MySQL 初期化後に実行してください。" >&2
  exit 1
fi

MYSQL_CMD="mysql --defaults-extra-file=/root/.my.cnf"
$MYSQL_CMD <<SQL
CREATE USER IF NOT EXISTS '${MYSQL_EXPORTER_USER}'@'localhost' IDENTIFIED BY '${MYSQL_EXPORTER_PASSWORD}';
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO '${MYSQL_EXPORTER_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

original_umask=$(umask)
umask 077
cat <<CNF > /etc/mysqld_exporter.cnf
[client]
user=${MYSQL_EXPORTER_USER}
password=${MYSQL_EXPORTER_PASSWORD}
CNF
if [ ! -f /etc/mysqld_exporter.cnf ]; then
  echo "[10-exporters] mysqld_exporter 設定ファイルの作成に失敗しました。" >&2
  exit 1
fi
chmod 600 /etc/mysqld_exporter.cnf
umask "$original_umask"

node_override_dir="/etc/systemd/system/prometheus-node-exporter.service.d"
mkdir -p "$node_override_dir"
cat <<'NODE' > "$node_override_dir/override.conf"
[Service]
ExecStart=
ExecStart=/usr/bin/prometheus-node-exporter --web.listen-address=0.0.0.0:9100
NODE

mysql_override_dir="/etc/systemd/system/prometheus-mysqld-exporter.service.d"
mkdir -p "$mysql_override_dir"
cat <<'MYSQL' > "$mysql_override_dir/override.conf"
[Service]
ExecStart=
ExecStart=/usr/bin/prometheus-mysqld-exporter --config.my-cnf=/etc/mysqld_exporter.cnf --web.listen-address=0.0.0.0:9104
MYSQL

systemctl daemon-reload
systemctl enable --now prometheus-node-exporter
systemctl enable --now prometheus-mysqld-exporter
