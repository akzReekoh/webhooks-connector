'use strict';

var platform = require('./platform'),
    request = require('request'),
    isJSON = require('is-json'),
	webHook;

/*
 * Listen for the data event.
 */
platform.on('data', function (data) {
    if(isJSON(data, true)) {
        request.post({
            url: webHook,
            json: true,
            body: data
        }, function (error, response, body) {
            if (error) platform.handleException(error);
        });
    }else
        platform.log('Invalid data received');
});

/*
 * Event to listen to in order to gracefully release all resources bound to this service.
 */
platform.on('close', function () {
    platform.notifyClose();
});

/*
 * Listen for the ready event.
 */
platform.once('ready', function (options) {
    webHook = options.webhook_url;

    platform.log('Webhooks Connector initialized.');
	platform.notifyReady();
});