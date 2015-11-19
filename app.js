'use strict';

var request       = require('request'),
	platform      = require('./platform'),
	isPlainObject = require('lodash.isplainobject'),
	webHook;

/*
 * Listen for the data event.
 */
platform.on('data', function (data) {
	if (isPlainObject(data)) {
		request.post({
			url: webHook,
			json: true,
			body: data
		}, function (error) {
			if (error)
				platform.handleException(error);
			else {
				platform.log(JSON.stringify({
					title: 'Data sent to webhook.',
					data: data
				}));
			}
		});
	}
	else
		platform.handleException(new Error('Invalid data received. Must be a valid JSON Object. Data ' + data));
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