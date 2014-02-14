# MQTT - Z-Way

Simple bridge between MQTT and Z-Way.

## Setup

	sudo /opt/node/bin/npm install mqtt-zway -g

## Start 

Start the MQTT broker with

	mosquitto

## Start broker

	./mqtt-zway.js -h mqtt://localhost:1883

## Configuration

Create/Modify configuration "config.json"

	[
	   {
	      "topic_incoming": "/home/devices/livingroom/light3/value/set",
	      "topic_outgoing": "/home/devices/livingroom/light3/value",
	      "url": "http://raspberrypi.local:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchMultilevel.Set(<value>)"
	    },
	   {
	      "topic_incoming": "/home/devices/livingroom/thermostat/value/set",
	      "topic_outgoing": "/home/devices/livingroom/thermostat/value",
	      "url": "http://raspberrypi.local:8083/ZWaveAPI/Run/devices[3].instances[0].ThermostatSetPoint.Set(1,<value>)"
	    }
	]
	
## Start application

Start application with the path to the config file and the URL of the MQTT broker

	mqtt-zway -c /path/to/config.json -h mqtt://localhost:1883

or run it in the backround with logging to a file

	nohup mqtt-zway -c /path/to/config.json > mqtt-zway.log  &

You can also set the MQTT broker url as environment variable

	export MQTT_BROKER_URL=mqtt://localhost:1883

## Example URLs to control Z-Wave devices

### Dimmer

Get Value
	http://raspberrypi.local:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchMultilevel.data.level.value
Set Value
	http://raspberrypi.local:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchMultilevel.Set(200)


## Thermostat

Get Battery Level
	http://raspberrypi.local:8083/ZWaveAPI/Run/devices[3].instances[0].Battery.data.last.value
Get Level
	http://raspberrypi.local:8083/ZWaveAPI/Run/devices[3].instances[0].ThermostatSetPoint.data[1].setVal.value
Set Level
	http://raspberrypi.local:8083/ZWaveAPI/Run/devices[3].instances[0].ThermostatSetPoint.Set(1,<temp>)


	