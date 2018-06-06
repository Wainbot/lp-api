/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        societe: {
            model: 'societe'
        },
        pseudo: {
            type: 'string',
            required: true
        },
        nom: {
            type: 'string',
            required: true,
            defaultsTo: ''
        },
        prenom: {
            type: 'string',
            required: true,
            defaultsTo: ''
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        telephone: {
            type: 'string',
            required: true,
            defaultsTo: '0600000000'
        },
        mdp: {
            type: 'string',
            required: true
        },
        status: {
            type: 'integer',
            enum: [0, 1, 2],
            defaultsTo: 0
        }
    }
};

