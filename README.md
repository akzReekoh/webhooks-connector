# Webhooks Connector
[![Build Status](https://travis-ci.org/Reekoh/webhooks-connector.svg)](https://travis-ci.org/Reekoh/webhooks-connector)
![Dependencies](https://img.shields.io/david/Reekoh/webhooks-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/webhooks-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Webhooks Connector Plugin for the Reekoh IoT Platform. Integrates a Reekoh instance to any HTTP endpoint to POST and synchronize device data.

# Description
This plugin sends data from devices connected to the Reekoh Instance to any HTTP source/endpoint of choice.

# Configuration
To configure this plugin a Webhook URL is needed. All data from the devices will be sent to this URL.
This Webhook URL is then injected to the plugin from the platform.