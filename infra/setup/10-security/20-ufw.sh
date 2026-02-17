#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-ufw] root 権限で実行してください。" >&2
  exit 1
fi

if ! systemctl is-active --quiet fail2ban; then
  echo "[20-ufw] fail2ban が未起動です。先に fail2ban を有効化してください。" >&2
  exit 1
fi
if ! fail2ban-client status sshd >/dev/null 2>&1; then
  echo "[20-ufw] fail2ban の sshd jail が有効ではありません。" >&2
  exit 1
fi

ufw default deny incoming
ufw default allow outgoing

# HTTPS のみ公開し、HTTP 80/tcp は開けない（TLS-ALPN-01 を利用）
ufw allow 443/tcp
is_valid_ip() {
  local ip="$1"
  local host="${ip%%/*}"
  local mask=""
  if [[ "$ip" == */* ]]; then
    mask="${ip#*/}"
    if ! [[ "$mask" =~ ^[0-9]{1,2}$ ]] || [ "$mask" -gt 32 ]; then
      return 1
    fi
  fi
  if ! [[ "$host" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
    return 1
  fi
  IFS='.' read -r -a octets <<< "$host"
  for octet in "${octets[@]}"; do
    if [ "$octet" -gt 255 ]; then
      return 1
    fi
  done
  return 0
}
if [ -n "${SSH_ALLOW_IPS:-}" ]; then
  IFS=' ' read -r -a ssh_ips <<< "$SSH_ALLOW_IPS"
  for ip in "${ssh_ips[@]}"; do
    if ! is_valid_ip "$ip"; then
      echo "[20-ufw] SSH_ALLOW_IPS の形式が不正です: $ip" >&2
      exit 1
    fi
    ufw allow from "$ip" to any port 22 proto tcp
  done
else
  ufw allow 22/tcp
fi

metrics_ports=(9100 9104)
metrics_ips=()
if [ -n "${METRICS_ALLOW_IPS:-}" ]; then
  IFS=' ' read -r -a metrics_ips <<< "$METRICS_ALLOW_IPS"
fi
if [ "${#metrics_ips[@]}" -eq 0 ]; then
  echo "[20-ufw][WARNING] METRICS_ALLOW_IPS が未指定のため全 IP 許可になります。セキュリティリスクがあるため明示指定してください。" >&2
  for port in "${metrics_ports[@]}"; do
    ufw allow "${port}/tcp"
  done
else
  for ip in "${metrics_ips[@]}"; do
    for port in "${metrics_ports[@]}"; do
      ufw allow from "$ip" to any port "$port" proto tcp
    done
  done
fi

if ufw status | grep -q inactive; then
  ufw --force enable
else
  ufw reload
fi
