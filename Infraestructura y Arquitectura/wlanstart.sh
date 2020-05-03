#!/bin/bash -e

# Check if running in privileged mode
if [ ! -w "/sys" ] ; then
    echo "[Error] Not running in privileged mode."
    exit 1
fi

# Default values
true ${INTERFACE:=wlx503eaa6591c7}
true ${SSID:=terminal1}
true ${CHANNEL:=1}
true ${WPA_PASSPHRASE:=12345678}
true ${HW_MODE:=g}
true ${DRIVER:=nl80211}
true ${MODE:=guest}

# Attach interface to container in guest mode
if [ "$MODE" == "guest"  ]; then
    echo "Attaching interface to container"

    CONTAINER_ID=$(cat /proc/self/cgroup | grep -o  -e "/docker/.*" | head -n 1| sed "s/\/docker\/\(.*\)/\\1/")
    CONTAINER_PID=$(docker inspect -f '{{.State.Pid}}' ${CONTAINER_ID})
    CONTAINER_IMAGE=$(docker inspect -f '{{.Config.Image}}' ${CONTAINER_ID})

    docker run -t --privileged --net=host --pid=host --rm --entrypoint /bin/sh ${CONTAINER_IMAGE} -c "
        PHY=\$(echo phy\$(iw dev ${INTERFACE} info | grep wiphy | tr ' ' '\n' | tail -n 1))
        iw phy \$PHY set netns ${CONTAINER_PID}
    "
fi

if [ ! -f "/etc/hostapd.conf" ] ; then
    cat > "/etc/hostapd.conf" <<EOF
interface=${INTERFACE}
bridge=br0
driver=${DRIVER}
ssid=${SSID}
country_code=ES
hw_mode=${HW_MODE}
channel=${CHANNEL}
wpa=2
auth_algs=1
wpa_passphrase=${WPA_PASSPHRASE}
wpa_key_mgmt=WPA-PSK
wpa_pairwise=CCMP
EOF

fi

# unblock wlan
rfkill unblock wlan

echo "Setting interface ${INTERFACE}"

# Setup interface and restart DHCP service
ip link set ${INTERFACE} up

# NAT settings
echo "NAT settings ip_dynaddr, ip_forward"

for i in conf/all/proxy_arp ip_forward ; do
  if [ $(cat /proc/sys/net/ipv4/$i) ]; then
    echo $i already 1
  else
    echo "1" > /proc/sys/net/ipv4/$i
  fi
done

cat /proc/sys/net/ipv4/ip_dynaddr
cat /proc/sys/net/ipv4/ip_forward

echo "Starting HostAP daemon ..."
/usr/sbin/hostapd /etc/hostapd.conf
