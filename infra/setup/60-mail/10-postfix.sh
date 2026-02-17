#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-postfix] root 権限で実行してください。" >&2
  exit 1
fi

: "${POSTFIX_RELAY_HOST:?POSTFIX_RELAY_HOST が未設定です}"
: "${POSTFIX_RELAY_PORT:?POSTFIX_RELAY_PORT が未設定です}"
: "${POSTFIX_RELAY_USER:?POSTFIX_RELAY_USER が未設定です}"
: "${POSTFIX_RELAY_PASS:?POSTFIX_RELAY_PASS が未設定です}"
: "${ALERT_FROM:?ALERT_FROM が未設定です}"
: "${ALERT_TO:?ALERT_TO が未設定です}"

export DEBIAN_FRONTEND=noninteractive
echo "postfix postfix/mailname string ${POSTFIX_RELAY_HOST}" | debconf-set-selections
echo "postfix postfix/main_mailer_type string 'Internet Site'" | debconf-set-selections
apt-get install -y postfix mailutils

postconf -e "relayhost = [${POSTFIX_RELAY_HOST}]:${POSTFIX_RELAY_PORT}"
postconf -e "smtp_sasl_auth_enable = yes"
postconf -e "smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd"
postconf -e "smtp_sasl_security_options = noanonymous"
postconf -e "smtp_use_tls = yes"
postconf -e "smtp_tls_security_level = encrypt"
postconf -e "smtp_generic_maps = hash:/etc/postfix/generic"

original_umask=$(umask)
umask 077
sasl_tmp=$(mktemp)
umask "$original_umask"
trap 'rm -f "$sasl_tmp"' EXIT
cat <<SASL > "$sasl_tmp"
[${POSTFIX_RELAY_HOST}]:${POSTFIX_RELAY_PORT} ${POSTFIX_RELAY_USER}:${POSTFIX_RELAY_PASS}
SASL
install -m 600 "$sasl_tmp" /etc/postfix/sasl_passwd
chown root:root /etc/postfix/sasl_passwd
postmap /etc/postfix/sasl_passwd

cat <<GENERIC > /etc/postfix/generic
root ${ALERT_FROM}
GENERIC
postmap /etc/postfix/generic

if grep -q '^root:' /etc/aliases; then
  sed -i "s/^root:.*/root: ${ALERT_TO}/" /etc/aliases
else
  echo "root: ${ALERT_TO}" >> /etc/aliases
fi
newaliases

systemctl enable --now postfix
systemctl restart postfix
