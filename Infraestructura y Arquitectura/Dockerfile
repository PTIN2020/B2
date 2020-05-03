FROM alpine

RUN apk add --no-cache bash hostapd iptables docker iw
ADD wlanstart.sh /bin/wlanstart.sh

ENTRYPOINT [ "/bin/wlanstart.sh" ]
