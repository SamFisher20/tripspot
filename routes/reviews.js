const express = require('express');
const Router = require('router');

const wrapAsync = require('../utility/wrapAsync.js');
const expressError = require('../utility/expressError.js');

const CollectionTripspot = require('../model/toursite');
const Review = require('../model/review.js');
const reviews = require('../controllers/reviews.js');

const { validateReview, isLoggedIn, isReviewOwner } = require('../middleware')

const router = Router({ mergeParams: true });


router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewOwner, wrapAsync(reviews.deleteReview))


module.exports = router;