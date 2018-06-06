var bcrypt = require('bcryptjs');

/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    register: function (req, res) {

        function createUserAndSendMail(register) {
            Client
                .create(register)
                .exec(function (error, client) {
                    if (error) return res.serverError(error);
                    if (client) {
                        sails.hooks.email.send(
                            'confirmationRegister',
                            {
                                nom: client.nom,
                                prenom: client.prenom,
                                id: client.id
                            },
                            {
                                to: client.email,
                                subject: "Confirmation d'inscription"
                            },
                            function (err) {
                                console.log(err || "It worked!");
                                return res.json(client);
                            }
                        );
                    }
                });
        }

        var register = req.allParams();
        register.pseudo = 'libertypro';

        bcrypt.genSalt(10, function (error, salt) {
            if (error) return res.serverError(error);

            bcrypt.hash(register.mdp, salt, function (error, hash) {
                if (error) return res.serverError(error);
                register.mdp = hash;

                Societe
                    .findOne({siret: register.societe.siret})
                    .exec(function (error, societe) {
                        if (error) return res.serverError(error);
                        if (typeof societe !== 'undefined' && societe) {
                            register.societe = societe.id;
                            createUserAndSendMail(register);
                        } else {
                            Societe
                                .create(register.societe)
                                .exec(function (error, societe) {
                                    if (error) return res.serverError(error);
                                    register.societe = societe.id;
                                    createUserAndSendMail(register);
                                });
                        }
                    });
            });
        });
    },

    login: function (req, res) {
        var email = req.param('email');
        var password = req.param('mdp');

        Client
            .findOne({
                email: email,
                status: [1, 2]
            })
            .exec(function (error, client) {
                if (error) return res.serverError(error);
                if (!client) return res.forbidden();

                bcrypt.compare(password, client.mdp, function (error, isMatch) {
                    if (error) return res.serverError(error);
                    if (!isMatch) return res.forbidden();

                    sails.log.info('User logged in', client);

                    var encryptedId = CryptographyService.encrypt(client.id);

                    return res.json({
                        token: TokenService.issue({id: client.id}),
                        cookie: encryptedId
                    });
                });
            });
    },

    resendMail: function (req, res) {
        var clientId = req.param('id');

        if (clientId) {
            Client
                .find(clientId)
                .exec(function (error, client) {
                    if (error) return res.serverError(error);

                    sails.hooks.email.send(
                        'confirmationRegister',
                        {
                            id: clientId,
                            prenom: client[0].prenom
                        },
                        {
                            to: client[0].email,
                            subject: "Confirmation d'inscription"
                        },
                        function (err) {
                            console.log(err || "Mail send to " + client[0].email);
                            return res.json(err || "It worked!");
                        }
                    );
                })
        } else return res.notFound();
    },

    confirm: function (req, res) {
        var clientId = req.param('id');

        if (clientId) {
            Client
                .update({id: clientId}, {status: 1})
                .exec(function (error) {
                    if (error) return res.serverError(error);
                    return res.ok();
                });
        }
    },

    getUserConnected: function (req, res) {
        var client = CryptographyService.decrypt(req.cookies.client);

        Client
            .findOne({id: client})
            .populate('societe')
            .exec(function (error, client) {
                if (error) return res.serverError(error);
                if (client) {
                    delete client.mdp;
                    return res.json(client);
                }
            });
    },

    premium: function (req, res) {
        var page = req.param('page') || 1;
        var size = req.param('size') || 10;

        Client
            .find({status: 2})
            .populate('societe')
            .paginate({page: page, limit: size})
            .exec(function (error, clients) {
                if (error) return res.serverError(error);
                if (clients) {
                    return res.json(clients);
                }
            });
    },

    count: function(req, res) {
        Client
            .count({status: 2})
            .exec(function(error, count) {
                if (error) return res.serverError(error);
                return res.json(count);
            });
    },

    destroy: function (req, res) {
        return res.ok();
    },
    remove: function (req, res) {
        return res.ok();
    },
    replace: function (req, res) {
        return res.ok();
    }
    // update: function(req, res) {
    //     return res.ok();
    // }
};

