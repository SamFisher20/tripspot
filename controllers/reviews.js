const CollectionTripspot = require('../model/toursite');
const Review = require('../model/review.js');

module.exports.createReview = async (req, res) => {
    const currsite = await CollectionTripspot.findById(req.params.id)
    const review = new Review(req.body.review)
    review.owner = req.user
    currsite.reviews.push(review)
    await review.save()
    await currsite.save()
    req.flash('success', 'Your review has been added')
    res.redirect(`/toursite/${currsite._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await CollectionTripspot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId)
    req.flash('success', 'Deleted your review')
    res.redirect(`/toursite/${id}`)
}