/**
 * Famille.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        label: {
            type: 'string',
            required: true
        },
        groupeFamille: {
            model: 'groupeFamille'
        },
        saisonDebut: {
            model: 'saison'
        },
        saisonFin: {
            model: 'saison'
        },
        provenances: {
            collection: 'pays',
            via: 'familles'
        },
        varietes: {
            collection: 'variete',
            via: 'famille'
        },
        calibres: {
            collection: 'calibre',
            via: 'famille'
        },
        conditionnements: {
            collection: 'conditionnement',
            via: 'familles'
        }
    }
};

