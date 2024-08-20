const Joi = require('joi');

module.exports.schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .required(),

    city: Joi.string()
        .required(),

    price: Joi.number()
        .required(),

    photo: Joi.string()
        .required(),

    description: Joi.string()
        .required(),

    guestsSize: Joi.number()
        .min(0)
        .required(),

    beds: Joi.number()
        .min(0)
        .required(),

    bathrooms: Joi.number()
        .min(0)
        .required()



})

