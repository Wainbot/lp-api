/**
 * Produit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        client: {
            model: 'Client'
        },
        categorie: {
            model: 'Categorie'
        },
        famille: {
            model: 'Famille'
        },
        variete: {
            model: 'Variete'
        },
        calibre: {
            model: 'Calibre'
        },
        provenance: {
            model: 'Pays'
        },
        infoJour: {
            type: 'text',
            defaultsTo: ''
        },
        actif: {
            type: 'boolean',
            defaultTo: true
        },
        images: {
            collection: 'Image'
        },
        tarifs: {
            collection: 'Tarif'
        }
    }
};

