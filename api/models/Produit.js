/**
 * Produit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        client: {
            model: 'client'
        },
        categorie: {
            model: 'categorie'
        },
        famille: {
            model: 'famille'
        },
        variete: {
            model: 'variete'
        },
        calibre: {
            model: 'calibre'
        },
        provenance: {
            type: 'string'
        },
        infoJour: {
            type: 'string'
        },
        actif: {
            type: 'boolean',
            defaultsTo: true
        },
        images: {
            collection: 'image',
            via: 'produit'
        },
        expediePays: {
            type: 'string'
        },
        expedieRegion: {
            type: 'string'
        },
        stock: {
            type: 'integer',
            defaultsTo: 0
        },
        bio: {
            type: 'boolean',
            defaultsTo: false
        },
        marque: {
            type: 'string'
        },
        transportCharge: {
            type: 'string'
        },
        typeTransport: {
            type: 'string'
        },
        restrictions: {
            collection: 'restriction',
            via: 'produit'
        },

        // AJOUT TARIF

        // kg, vrac, unite
        lunite: {
            model: 'unite'
        },
        // prix Kg
        prixKg: {
            type: 'float'
        },
        // prix unité
        prixUnite: {
            type: 'float'
        },
        // prix colisage
        prixColisage: {
            type: 'float'
        },
        // poids unité
        poidsUnite: {
            type: 'float'
        },
        // type de conditionnement pour une unité
        conditionnement: {
            model: 'conditionnement'
        },
        // nombre d'unite par colisage
        quantiteUniteColisage: {
            type: 'integer'
        },
        // type de colisage
        colisage: {
            model: 'colisage'
        },
        // quantité de colisage
        quantiteColisage: {
            type: 'integer'
        }
    }
};

