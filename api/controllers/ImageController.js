var uuidv1 = require('uuid/v1');
var base64Img = require('base64-img');

/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res) {
        var base64 = req.param('url');
        var produit = req.param('produit');
        var name = uuidv1();
        var location = '/var/www/html/files/';

        base64Img.img(base64, location, name, function(err, filepath) {
            Image
                .create({
                    url: filepath.replace(location, '/files/'),
                    produit: produit
                })
                .exec(function(error, image) {
                    if (error) return req.serverError(error);
                    return res.json(image);
                });
        });
    },
    destroy: function(req, res) {
        return res.ok();
    },
    remove: function(req, res) {
        return res.ok();
    },
    replace: function(req, res) {
        return res.ok();
    }
    // update: function(req, res) {
    //     return res.ok();
    // }
};

