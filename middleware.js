const { tripSchema, reviewSchema } = require('./validateSchemas.js');
const expressError = require('./utility/expressError.js');
const CollectionTripspot = require('./model/toursite');
const Review = require('./model/review');



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Must be signed in!')
        return res.redirect('/login')
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params
    const currsite = await CollectionTripspot.findById(id)
    if (!req.isAuthenticated() && !currsite.owner.equals(req.user._id)) {
        req.flash('error', "You don't have permission to update")
        return res.redirect(`/toursite/${id}`)
    } else {
        next()
    }
}

module.exports.validateTripSpot = (req, res, next) => {
    const { error } = tripSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 402)
    } else {
        next()
    }
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.owner.equals(req.user._id)) {
        req.flash('error', "You don't have permission to delete")
        return res.redirect(`/toursite/${id}`)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 403)
    } else {
        next()
    }
}
