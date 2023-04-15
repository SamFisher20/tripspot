const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'TripSpot',
        allowedFormats: ['jpeg', 'png', 'jpg', 'heic'],
        eager_async: true,
        transformation: [
            { width: 960, height: 540, gravity: "auto", crop: "fill", quality: "auto", fetch_format: "auto" },
        ]
    }
})

module.exports = {
    cloudinary,
    storage
}