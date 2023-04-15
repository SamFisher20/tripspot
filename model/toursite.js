const { string } = require('joi-plus');
const mongoose = require('mongoose');
const Reviews = require('./review.js')
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } }

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const ToursiteSchema = new Schema({
    title: String,
    images: [imageSchema],
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    lastUpdated: Number
}, opts)

ToursiteSchema.virtual('properties.popupMarkup').get(function () {
    return `<a href=/toursite/${this._id}>${this.title}</a>`
})

ToursiteSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Reviews.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

ToursiteSchema.virtual('lastUpdatedString').get(function () {
    const oneDay = 1000 * 60 * 60 * 24;
    const days = (Date.now() - this.lastUpdated) / oneDay;
    if (days < 1) {
        return 'Just today';
    } else if (days < 2) {
        return '1 day ago'
    }
    return Math.floor(days) + ' days ago';
})

module.exports = mongoose.model('Touristdest', ToursiteSchema)