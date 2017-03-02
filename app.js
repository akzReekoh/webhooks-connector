'use strict'

let reekoh = require('reekoh')
let _plugin = new reekoh.plugins.Connector()
let isArray = require('lodash.isarray')
let isPlainObject = require('lodash.isplainobject')
let request = require('request')

/**
 * Emitted when device data is received.
 * This is the event to listen to in order to get real-time data feed from the connected devices.
 * @param {object} data The data coming from the device represented as JSON Object.
 */
_plugin.on('data', (data) => {
  if (isPlainObject(data) || isArray(data)) {
    request.post({
      url: _plugin.config.webhookUrl,
      json: true,
      body: data
    }, (error) => {
      if (error) {
        _plugin.logException(error)
      } else {
        _plugin.log(JSON.stringify({
          title: 'Data sent to webhook.',
          data: data
        }))
      }
    })
  } else {
    _plugin.logException(new Error('Invalid data received. Must be a valid Array or JSON Object. Data ' + data))
  }
})

/**
 * Emitted when the platform bootstraps the plugin. The plugin should listen once and execute its init process.
 */
_plugin.once('ready', () => {
  _plugin.log('Webhooks Connector has been initialized.')
  _plugin.emit('init')
})

module.exports = _plugin
