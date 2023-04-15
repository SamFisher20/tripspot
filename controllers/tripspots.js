const CollectionTripspot = require('../model/toursite');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const { cloudinary } = require("../cloud")

const mapboxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapboxToken })

module.exports.index = async (req, res) => {       //show all
  const Alltoursite = await CollectionTripspot.find({});
  isMainPage = true;
  res.render('toursite/index', { Alltoursite })
}

module.exports.newForm = (req, res) => {       //redirect to new
  res.render('toursite/new')
}

module.exports.createTripSpot = async (req, res, next) => {     //new
  CollectionTripspot.exists({ title: req.body.toursite.title }, function (err, existingTitle) {
    if (existingTitle) {
      req.flash('error', `${req.body.toursite.title} already exits`)
      res.redirect('/toursite')
      return
    }
  })
  const geoData = await geocoder.forwardGeocode({
    query: req.body.toursite.location + ",India",
    limit: 1
  }).send()
  const newsite = new CollectionTripspot(req.body.toursite)
  newsite.geometry = geoData.body.features[0].geometry
  newsite.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
  newsite.owner = req.user
  newsite.lastUpdated = Date.now()
  await newsite.save()
  req.flash('success', 'Successfully created a destination')
  res.redirect(`/toursite/${newsite._id}`)
}

module.exports.showTripspot = async (req, res) => {    //show _id
  const currsite = await CollectionTripspot.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'owner'
    }
  }).populate('owner')
  if (!currsite) {
    req.flash('error', "Can't find the page")
    return res.redirect('/toursite')
  }
  res.render('toursite/show', { currsite })
}

module.exports.editForm = async (req, res) => {      //redirect to update
  const { id } = req.params
  const currsite = await CollectionTripspot.findById(id)
  if (!currsite) {
    req.flash('error', "Can't find the page")
    return res.redirect('/toursite')
  }
  res.render('toursite/edit', { currsite })
}

module.exports.editTripspot = async (req, res) => {     //update
  const { id } = req.params
  let currsite = await CollectionTripspot.findById(id)
  currsite.title = req.body.toursite.title
  currsite.location = req.body.toursite.location
  currsite.description = req.body.toursite.description
  if (req.files) {
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    currsite.images.push(...imgs)
  }
  await currsite.save()
  req.flash('success', 'Successfully updated destination')
  res.redirect(`/toursite/${currsite._id}`)
}

module.exports.deleteTripspot = async (req, res) => {      //delete 
  const { id } = req.params;
  const deleteSite = await CollectionTripspot.findByIdAndDelete(id)
  for (let img of deleteSite.images) {
    cloudinary.uploader.destroy(img.filename)
  }
  req.flash('success', 'Successfully deleted destination')
  res.redirect('/toursite')
}
