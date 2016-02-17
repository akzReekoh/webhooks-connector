'use strict';

var request       = require('request'),
	platform      = require('./platform'),
	isPlainObject = require('lodash.isplainobject'),
    isArray       = require('lodash.isarray'),
	webHook;

platform.on('data', function (data) {
	if (isPlainObject(data) || isArray(data)) {
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
		platform.handleException(new Error('Invalid data received. Must be a valid Array or JSON Object. Data ' + data));
});

platform.on('close', function () {
	platform.notifyClose();
});

platform.once('ready', function (options) {
	webHook = options.webhook_url;

	platform.log('Webhooks Connector initialized.');
	platform.notifyReady();
});