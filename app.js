'use strict';

var platform = require('./platform'),
    request = require('request'),
	webHook;

/*
 * Listen for the data event.
 */
platform.on('data', function (data) {
    request.post({
        url: webHook,
        body:data
    }, function(error, response, body){
        if(!error) return;

        platform.handleException(error);
    });
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