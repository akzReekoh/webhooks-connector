'use strict';

var platform = require('./platform'),
    request = require('request'),
	webHook;

/*
 * Listen for the data event.
 */
platform.on('data', function (data) {
    var domain = require('domain'),
        d = domain.create();

    d.once('error', function (error) {
        platform.handleException(error);
    });

    d.run(function () {
        request.post({
            url: webHook,
            json: true,
            body: data
        }, function (error, response, body) {
            if (error) platform.handleException(error);
            else{
                platform.log(JSON.stringify({
                    title: 'Data sent to webhook.',
                    data: data
                }));
            }
            d.exit();
        });
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