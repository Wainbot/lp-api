/**
 * Tarif.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        unite: {
            model: 'Unite'
        },
        conditionnement: {
            model: 'Conditionnement'
        },
        colisage: {
            model: 'Colisage'
        },
        prix: {
            type: 'float',
            required: true
        },
        poids: {
            type: 'integer',
            required: true
        },
        quantite: {
            type: 'integer'
        }
    }
};

