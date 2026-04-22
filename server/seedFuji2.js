require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if Fuji2 exists
    const existing = await Product.findOne({ reference: 'FUJI2 GRADIENT' });
    if (existing) {
      console.log('Fuji2 already exists!');
      process.exit(0);
    }

    const fuji2 = new Product({
      name: 'FUJI2 GRADIENT',
      reference: 'FUJI2 GRADIENT',
      subtitle: 'POLYCARBONATE TWIN-LENS GLASSES',
      image_url: 'https://media.deltaplus.eu/m/6cef337dcb2ce4c1/original/SAFETY-EYEWEAR-UI.pdf', // Using a placeholder since the image wasn't extracted directly, but we can use a valid image later or leave it as a string. Let's use a standard safety glasses placeholder
      category: 'Protective eyewear',
      description: 'Smoked-lens safety glasses with nose bridge and extremely flexible arms. Contemporary wrap-around bifocal design offers a close fit and comfortable protection. Anti-slip ends for an increased comfort and very good hold on the head (or on a helmet). Lens treatment: Anti-fogging (classic) - Anti-scratch (classic) - UV400.',
      price: 28.50
    });
    
    // Let's replace the image_url with a working image since pdf won't render
    fuji2.image_url = 'https://media.deltaplus.eu/m/5672ab68434ce33/webimage-fuji2noin_web.jpg';

    await fuji2.save();
    console.log('Fuji2 Gradient successfully added to database!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
