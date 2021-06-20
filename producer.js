const fs = require('fs');
const toml = require('toml');

var amqp = require('amqplib/callback_api');
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

amqp.connect(config.RABBBITMQ, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {

        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        setInterval(function () {
            channel.sendToQueue(queue, Buffer.from(msg.toString()));
            console.log(" [x] Sent %s", msg);
        }, 1000)
    });
});

