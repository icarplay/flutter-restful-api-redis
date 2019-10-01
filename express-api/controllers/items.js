const redis = require('redis');

let client;
//Transformar isso em um Middleware
client = redis.createClient("redis://redis-11872.c74.us-east-1-4.ec2.cloud.redislabs.com:11872");
client.auth("Fatec2019#", (err, reply) => {
    if (err) {
        res.status(406).json(
            {
                "response": null,
                "error": err
            }
        );
    } else {
        next();
    }
});

exports.setItem = function(req, res, next) {

    

}