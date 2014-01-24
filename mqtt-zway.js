#!/usr/bin/env node
var mqtt = require('mqtt');
var logger = require('npmlog');
var optimist = require('optimist');
var url = require('url');
var fs = require('fs');
var rest = require('restler');

var argv = optimist
  .usage('mqtt-zway: receive shell commands on MQTT messages\n \
    Usage: mqtt-zway -h <broker-url> -t <topics>')
  .options('h', {
      describe: 'broker url'
    , default: 'mqtt://localhost:1883'
    , alias: 'broker-url'
  })
  .argv;

// Parse url
var mqtt_url = url.parse(process.env.MQTT_BROKER_URL || argv.h);
var auth = (mqtt_url.auth || ':').split(':');

//Loading config
var configuration = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());
var topics_incoming = [];
var urls_incoming = [];
var topics_outgoing = {};

//Loading topics to subscribe and the corresponding topics for the outgoing value
for (var i=0;i<configuration.length;i++){ 
    var device = configuration[i];
    topics_incoming.push(device.topic_incoming);
    topics_outgoing[device.topic_incoming] = device.topic_outgoing;
    urls_incoming[device.topic_incoming] = device.url;
}

//Creating the MQTT Client
console.log("Creating client for: " + mqtt_url.hostname);
// Create a client connection
var c = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

c.on('connect', function() {
  console.log("Subscribe to topics...: " + topics_incoming);
  c.subscribe(topics_incoming);
  c.on('message', function(topic, message) {
    topic = topic.replace(/"/g, "\\\"");
    var message = message.replace(/"/g, "\\\"");   
    executeCommand(topic,message);
  });
});

function executeCommand(topic,payload) {
  var topic_outgoing = topics_outgoing[topic];
  var url = urls_incoming[topic];
  url = url.replace(/<value>/g,payload);
  console.log("Executing Z-Way command: " + url + " for topic: " + topic);
  executeHttp(url);
  console.log("Report value back to topic: " + topic_outgoing + " with value: " + payload);
  c.publish(topic_outgoing,payload,{retain: true});
}

function executeHttp(url) {
  rest.get(url).on('complete', function(result) {
      if (result instanceof Error) {
          console.log('Error:', result.message);
        } else {
          console.log("Command executed succesfully: " +result);
        }
    });
}
  
function sleep(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, ms);
    Fiber.yield();
}