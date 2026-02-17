#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[30-motd] root 権限で実行してください。" >&2
  exit 1
fi

cat <<'ISSUE' > /etc/issue
       _-_
    /~~     ~~\
  |   *  sakura  *   |
    \_       _/
        `-_-' 

 Welcome, sakura.
 This server is managed with care.
ISSUE

cat <<'MOTD' > /etc/update-motd.d/99-custom
#!/usr/bin/env bash

LANG=C
echo "----------------------------------------"
echo " System Status ($(date '+%Y-%m-%d %H:%M:%S'))"
echo "----------------------------------------"

# Host / OS
echo " Hostname : $(hostname)"
echo " OS       : $(. /etc/os-release; echo ${PRETTY_NAME})"

# Uptime / Load
echo " Uptime   : $(uptime -p)"
echo " LoadAvg  : $(cut -d ' ' -f1-3 /proc/loadavg)"

# CPU
CPU_IDLE=$(mpstat 1 1 | awk '/Average:.*all/ {print $NF}')
echo " CPU Idle : ${CPU_IDLE}%"

# Memory
free -b | awk '
/Mem:/ {
  used=$3; total=$2;
  printf " Memory   : %.1f%% used (%.1fGiB/%.1fGiB)\n", used/total*100, used/1024/1024/1024, total/1024/1024/1024
}'

# Disk
df -h / | awk '
NR==2 {
  printf " Disk /   : %s used (%s)\n", $5, $4
}'

echo "----------------------------------------"
MOTD

chmod +x /etc/update-motd.d/99-custom
