/**
 * Societe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      type: {
          model: 'TypeSociete'
      },
      enseigne: {
          type: 'string',
          required: true
      },
      siret: {
          type: 'integer',
          required: true,
          unique: true
      },
      cp: {
          type: 'integer',
          required: true,
          size: 5
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

