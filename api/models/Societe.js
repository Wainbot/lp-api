/**
 * Societe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        typeSociete: {
            model: 'typeSociete'
        },
        typeClient: {
            model: 'typeClient'
        },
        enseigne: {
            type: 'string',
            required: true
        },
        siret: {
            type: 'string',
            required: true,
            unique: true
        },
        adresse: {
            type: 'string',
            required: true
        },
        cp: {
            type: 'string',
            required: true
        },
        ville: {
            type: 'string',
            required: true
        },
        pays: {
            type: 'string',
            required: true
        }
    }
};

