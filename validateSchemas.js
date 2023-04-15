const joi = require('joi-plus');

module.exports.tripSchema = joi.object({
    toursite: joi.object({
        title: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required().escape()
    }).required(),
    deleteImages: joi.array()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        body: joi.string().required().escape()
    }).required()
})