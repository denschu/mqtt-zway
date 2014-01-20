# MQTT - Z-Way

Simple bridge between MQTT and Z-Way.

## Installation

	npm install

## Start

	./mqtt-zway.js -h mqtt://localhost:1883

## Example URLs

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


	