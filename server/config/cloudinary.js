const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || '').trim(),
    api_key: (process.env.CLOUDINARY_API_KEY || '').trim(),
    api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim()
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'prior-safe-products'
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
