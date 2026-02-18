#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[00-packages] root 権限で実行してください。" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get upgrade -y

apt-get install -y \
  ca-certificates \
  curl \
  fail2ban \
  git \
  gnupg \
  jq \
  logrotate \
  lsb-release \
  openssl \
  ssl-cert \
  sysstat \
  ufw \
  unzip

if [ -f /etc/default/sysstat ]; then
  sed -i 's/ENABLED="false"/ENABLED="true"/' /etc/default/sysstat
fi

systemctl enable --now sysstat
systemctl enable --now logrotate.timer
