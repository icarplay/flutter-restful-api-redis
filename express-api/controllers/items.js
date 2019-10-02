
//Transformar isso em um Middleware
const redis = require('redis');

let client;

exports.createCard = function(req, res, next) {

    let card = req.body.card;
    let description = req.body.description;

    if (card == undefined || description == undefined) {
        res.status(406).json(
            {
                "response": null,
                "error": "Invalid Params!"
            }
        );
    } else {
        client = redis.createClient("redis://redis-11872.c74.us-east-1-4.ec2.cloud.redislabs.com:11872");
        client.auth("Fatec2019#", (err, reply) => {
            if (err) {
                client.end(true);
                res.status(406).json(
                    {
                        "response": null,
                        "error": err
                    }
                );
            } else {
                client.set(card, description, (err, reply) => {
                    if (err) {
                        client.end(true);
                        res.status(500).json(
                            {
                                "response": null,
                                "error": err
                            }
                        );
                    } else {
                        client.end(true);
                        res.status(201).json(
                            {
                                "error": null,
                                "response": reply
                            }
                        );
                    }
                });
            }
        });
    }

}

exports.createCardDate = function(req, res, next) {
    
    let card = req.body.card;
    let description = req.body.description;
    let dateCard = req.body.dateCard;

    if (card == undefined || description == undefined || dateCard == undefined) {
        res.status(406).json(
            {
                "response": null,
                "error": "Invalid Params!"
            }
        );
    } else {
        client = redis.createClient("redis://redis-11872.c74.us-east-1-4.ec2.cloud.redislabs.com:11872");
        client.auth("Fatec2019#", (err, reply) => {
            if (err) {
                client.end(true);
                res.status(406).json(
                    {
                        "response": null,
                        "error": err
                    }
                );
            } else {
                client.hmset(card, description, dateCard, (err, reply) => {
                    if (err) {
                        client.end(true);
                        res.status(500).json(
                            {
                                "response": null,
                                "error": err
                            }
                        );
                    } else {
                        client.end(true);
                        res.status(201).json(
                            {
                                "error": null,
                                "response": reply
                            }
                        );
                    }
                });
            }
        });
    }

}


exports.deleteCard = function(req, res, next) {

    let card = req.body.card;

    if (card == undefined) {
        res.status(406).json(
            {
                "response": null,
                "error": "Invalid Params!"
            }
        );
    } else {
        client = redis.createClient("redis://redis-11872.c74.us-east-1-4.ec2.cloud.redislabs.com:11872");
        client.auth("Fatec2019#", (err, reply) => {
            if (err) {
                client.end(true);
                res.status(406).json(
                    {
                        "response": null,
                        "error": err
                    }
                );
            } else {
                client.del(card, (err, reply) => {
                    if (err) {
                        client.end(true);
                        res.status(500).json(
                            {
                                "response": null,
                                "error": err
                            }
                        );
                    } else {
                        client.end(true);
                        res.status(200).json(
                            {
                                "error": null,
                                "response": reply
                            }
                        );
                    }
                });
            }
        });
    }

}

exports.deleteCardDate = function(req, res, next) {

    let card = req.body.card;

    if (card == undefined) {
        res.status(406).json(
            {
                "response": null,
                "error": "Invalid Params!"
            }
        );
    } else {
        client = redis.createClient("redis://redis-11872.c74.us-east-1-4.ec2.cloud.redislabs.com:11872");
        client.auth("Fatec2019#", (err, reply) => {
            if (err) {
                client.end(true);
                res.status(406).json(
                    {
                        "response": null,
                        "error": err
                    }
                );
            } else {
                client.hdel(card, (err, reply) => {
                    if (err) {
                        client.end(true);
                        res.status(500).json(
                            {
                                "response": null,
                                "error": err
                            }
                        );
                    } else {
                        client.end(true);
                        res.status(200).json(
                            {
                                "error": null,
                                "response": reply
                            }
                        );
                    }
                });
            }
        });
    }

}