const express = require('express');
const Router = require('router');
const multer = require('multer');
const { storage } = require('../cloud');
const upload = multer({ storage });

const wrapAsync = require('../utility/wrapAsync.js');

const toursite = require('../controllers/tripspots');
const CollectionTripspot = require('../model/toursite');

const { isLoggedIn, validateTripSpot, isOwner } = require('../middleware.js')

const router = Router();

router.route('/')
    .get(wrapAsync(toursite.index))
    .post(isLoggedIn, upload.array('image', 5), validateTripSpot, wrapAsync(toursite.createTripSpot))


router.get('/new', isLoggedIn, toursite.newForm)
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(toursite.editForm))


router.route('/:id')
    .get(wrapAsync(toursite.showTripspot))
    .put(isLoggedIn, isOwner, upload.array('image', 5), validateTripSpot, wrapAsync(toursite.editTripspot))
    .delete(isLoggedIn, isOwner, wrapAsync(toursite.deleteTripspot))

router.patch('/:id/delete/:imageurl', wrapAsync(toursite.deleteImage))


module.exports = router;