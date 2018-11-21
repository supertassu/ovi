#/bin/sh
screen -S test -d -m python3 /home/pi/ovi/iot/collect.py >> /home/pi/iot.log 2>&1
