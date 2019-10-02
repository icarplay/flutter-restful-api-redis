const redis = require('redis');

let client;

exports.createCard = function(req, res, next) {

    let card = req.body.card;
    let description = req.body.description;
    let expire = req.body.expire;
    
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
                client.hmset(card, "description", description, "date", dateCard, (err, reply) => {
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

exports.getCards = function(req, res, next) {

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
            client.keys("*", (err, reply) => {
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

exports.getCard = function(req, res, next) {

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
                client.type(card, (err, typeData) => {
                    if (err) {
                        client.end(true);
                        res.status(406).json(
                            {
                                "response": null,
                                "error": err
                            }
                        );
                    } else {

                        if (typeData == "none") {
                            
                            client.end(true);
                            res.status(404).json(
                                {
                                    "response": null,
                                    "error": "Not found!"
                                }
                            );

                        } else if (typeData == "string") {
                            
                            client.get(card, (err, data) => {
                                if (err) {
                                    client.end(true);
                                    res.status(406).json(
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
                                            "response": data
                                        }
                                    )
                                }
                            });
                            
                        } else if (typeData == "hash") {
                            
                            client.hgetall(card, (err, data) => {
                                if (err) {
                                    client.end(true);
                                    res.status(406).json(
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
                                            "response": data
                                        }
                                    )
                                }
                            });

                        } else {
                            console.log(typeData);
                            client.end(true);
                            res.status(406).json(
                                {
                                    "response": null,
                                    "error": "Invalid!"
                                }
                            );
                        }
                    }
                });
            }
        });

    }

}