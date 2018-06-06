var uuidv1 = require('uuid/v1');
var base64Img = require('base64-img');

/**
 * ProduitController
 *
 * @description :: Server-side logic for managing produits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    average: function(req, res) {
        Produit
            .find({actif: true})
            .average('prixKg')
            .exec(function(error, average) {
                if (error) return res.serverError(error);
                return res.json(average);
            });
    },

    count: function(req, res) {
        Produit
            .count({actif: true})
            .exec(function(error, count) {
                if (error) return res.serverError(error);
                return res.json(count);
            });

    },

    countByClient: function(req, res) {
        var client = CryptographyService.decrypt(req.cookies.client);
        Produit
            .count({client:client})
            .exec(function(error, count) {
                if (error) return res.serverError(error);
                return res.json(count);
            });
    },

    // find: function(req, res) {
    //     var page = req.param('page') || 1;
    //     var size = req.param('size') || 10;
    //
    //     Produit
    //         .find({actif: true})
    //         .populate('categorie')
    //         .populate('famille')
    //         .populate('variete')
    //         .populate('calibre')
    //         .populate('images', {
    //             limit: 1
    //         })
    //         .populate('lunite')
    //         .populate('conditionnement')
    //         .populate('colisage')
    //         .populate('client')
    //         .paginate({page: page, limit: size})
    //         .sort('createdAt DESC')
    //         .exec(function(error, produits) {
    //             if (error) return res.serverError(error);
    //             return res.json(produits);
    //         });
    // },

	byClient: function(req, res) {
        var client = req.param('client') || CryptographyService.decrypt(req.cookies.client);
        var page = req.param('page') || 1;
        var size = req.param('size') || 10;

        Produit
            .find({ client: client })
            .populate('categorie')
            .populate('famille')
            .populate('variete')
            .populate('calibre')
            .populate('images', {
                limit: 1
            })
            .populate('lunite')
            .populate('conditionnement')
            .populate('colisage')
            .populate('client')
            .paginate({page: page, limit: size})
            .sort('createdAt DESC')
            .exec(function(error, produits) {
                if (error) return res.serverError(error);
                return res.json(produits);
            });
    },

    creerProduit: function(req, res) {
        var produit = req.allParams();
        var clientId = CryptographyService.decrypt(req.cookies.client);
        produit.client = clientId;

        var images = produit.images;
        produit.images = [];

        Client
            .findOne(clientId)
            .exec(function(error, client) {

                Produit
                    .create(produit)
                    .exec(function(error, produit) {
                        if (error) return res.serverError(error);

                        for (var index in images) {
                            var base64 = images[index].url;
                            var name = uuidv1();
                            var location = '/var/www/html/files/';

                            base64Img.img(base64, location, name, function(err, filepath) {
                                Image
                                    .create({
                                        url: filepath.replace(location, '/files/'),
                                        produit: produit.id
                                    })
                                    .exec(function(error) {
                                        if (error) return req.serverError(error);
                                    });
                            });
                        }

                        sails.hooks.email.send(
                            'confirmationProduct',
                            {
                                nom: client.nom,
                                prenom: client.prenom,
                                id: client.id,
                                produit: produit
                            },
                            {
                                to: client.email,
                                subject: "Nouveau produit"
                            },
                            function (err) {
                                console.log(err || "It worked!");
                                return res.json(produit);
                            }
                        );
                    });
            });
    },

    update: function(req, res) {
        var produit = req.allParams();
        var images = produit.images;
        delete produit.images;

        Produit
            .update(produit.id, produit)
            .exec(function(error) {
                if (error) return res.serverError(error);

                Image
                    .destroy({ produit: produit.id })
                    .exec(function(error) {
                        if (error) return res.serverError(error);

                        for (var index in images) {

                            var base64 = images[index].url;
                            var name = uuidv1();
                            var location = '/var/www/html/files/';

                            base64Img.img(base64, location, name, function(err, filepath) {
                                Image
                                    .create({
                                        url: filepath.replace(location, '/files/'),
                                        produit: produit.id
                                    })
                                    .exec(function(error) {
                                        if (error) return res.serverError(error);
                                        return res.json(produit);
                                    });
                            });
                        }
                    });
            });
    },
    // destroy: function(req, res) {
    //     return res.ok();
    // },
    // remove: function(req, res) {
    //     return res.ok();
    // },
    replace: function(req, res) {
        return res.ok();
    }
    // update: function(req, res) {
    //     return res.ok();
    // }
};

