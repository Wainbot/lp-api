/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        type: {
            model: 'TypeClient'
        },
        societe: {
            model: 'Societe'
        },
        pseudo: {
            type: 'string',
            required: true,
            unique: true
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
            type: 'email',
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
        adresse: {
            type: 'string',
            required: true
        },
        status: {
            type: 'integer',
            required: true,
            enum: [0, 1, 2],
            defaultsTo: 0
        }
    }
};

