#!/usr/bin/python3

import envirophat
import json
import requests
import os
import time

def readSensors():
    sensors = {
        "temperature": envirophat.weather.temperature(),
        "pressure": envirophat.weather.pressure(),
        "magnetometer": str(envirophat.motion.magnetometer()),
        "heading": str(envirophat.motion.heading()),
        "rgb": str(envirophat.light.rgb()),
        "light": str(envirophat.light.light()),
        "raw": str(envirophat.light.raw()),
    }

    return sensors

if __name__ == "__main__":
    url = "https://ovi-backend.herokuapp.com/" # url to send
    old = {"light": "0"}
    last = 0

    while True:

        # turn lights on
        envirophat.leds.on()

        # read data
        data = readSensors()

        # send if needed
        if (abs(int(old["light"]) - int(data["light"])) > 100) or (time.time() - last > 70):
            print("sending at", time.time())
            
            last = time.time()
            old = data

            sensorsJson = json.dumps(readSensors(), sort_keys=True, indent=2)
            headers = {'content-type': 'application/json'}
            requests.post(url, data=sensorsJson, headers=headers)

        # turn lights off
        envirophat.leds.off()
        
        # sleep
        time.sleep(5)
