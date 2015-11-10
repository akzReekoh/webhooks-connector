'use strict';

const WEBHOOK_URL = 'https://endpoint1.collection.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV2Go4vCe8vI_ksTgTInUF3ya_0v7vQ7RrTo3qbbA08VxSaJAM1XQe_lnTSbvB460lfPKJPOgD-xQo14-uLkRg9C6V4rwdkNKbMWOMxUzfmsoQ==';

var cp     = require('child_process'),
	assert = require('assert'),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function () {
        setTimeout(function(){
            connector.kill('SIGKILL');
        }, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			connector.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			connector.send({
				type: 'ready',
				data: {
					options: {
						webhook_url: WEBHOOK_URL
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#data', function (done) {
		it('should process the data', function () {
			connector.send({
				type: 'data',
				data: JSON.stringify({
					title : 'Test message',
                    message : 'This is a test message from webhook connector'
				})
			}, done);
		});
	});
});