'use strict';

const WEBHOOK_URL = 'http://requestb.in/10sfd4a1';

var cp     = require('child_process'),
	assert = require('assert'),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function (done) {
        this.timeout(7000);

        setTimeout(function(){
            connector.kill('SIGKILL');
            done();
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
		it('should process the JSON data', function () {
			connector.send({
				type: 'data',
				data: JSON.stringify({
					title : 'Test message',
                    message : 'This is a test message from webhook connector'
				})
			}, done);
		});
	});

    describe('#data', function (done) {
        it('should process the Array data', function () {
            var data = ['Test message', 'This is a test message from webhook connector'];
            connector.send({
                type: 'data',
                data: data
            }, done);
        });
    });
});