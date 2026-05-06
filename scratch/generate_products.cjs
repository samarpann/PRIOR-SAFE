const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = 'D:\\office\\prior-safe\\public\\photos';
const OUTPUT_FILE = 'D:\\office\\prior-safe\\src\\data\\products.json';

const categoryMapping = {
    'fall-protection': 'Fall protection',
    'head-protection': 'Head protection',
    'protective clothing': 'Protective clothing',
    'safety footwear': 'Safety footwear',
    'safety gloves': 'Safety gloves'
};

const subCategoryMapping = {
    'heraring protection': 'Hearing protection',
    'safety eyewear': 'Protective eyewear',
    'skull protection': 'Skull protection',
    'respiratory protection': 'Respiratory protection',
    'disposal-wear': 'Disposable wear',
    'outdoor-wear': 'Outdoor wear',
    'technical-wear': 'Technical wear',
    'workwear': 'Workwear',
    'indoor': 'Indoor',
    'outdoor': 'Outdoor',
    'sport': 'Sport',
    'chemical protection': 'Chemical protection',
    'craftman\'s protection': 'Craftman\'s protection',
    'cut protection': 'Cut protection',
    'mechnical protection for heavy task work': 'Mechanical protection for heavy works',
    'mechnical protection for multi-purpose work': 'Mechanical protection for multi purpose works',
    'mechnical protection for precision work': 'Mechanical protection for precision works',
    'thermal protection': 'Thermal protection',
    'Anchorage - Work positioning': 'Anchorage - Work positioning',
    'body-support': 'Body support',
    'connecting-system': 'Connecting systems',
    'Fall arrester systems': 'Fall arrester systems'
};

function getProducts(dir, currentCategory = '', currentSubCategory = '') {
    const files = fs.readdirSync(dir);
    let products = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            let cat = currentCategory;
            let subCat = currentSubCategory;

            if (!currentCategory) {
                cat = categoryMapping[file] || file;
            } else if (!currentSubCategory) {
                subCat = subCategoryMapping[file] || file;
            }

            products = products.concat(getProducts(filePath, cat, subCat));
        } else if (file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
            const productName = file.replace(/-eps\.png$/i, '').replace(/\.(png|jpg|jpeg|gif|webp)$/i, '').replace(/-/g, ' ');
            const relPath = '/' + path.relative('D:\\office\\prior-safe\\public', filePath).replace(/\\/g, '/');
            
            products.push({
                name: productName.toUpperCase(),
                reference: productName.replace(/\s+/g, '_').toUpperCase(),
                subtitle: `Premium ${currentSubCategory || currentCategory} for industrial safety.`,
                image_url: relPath,
                category: currentCategory,
                subCategory: currentSubCategory || currentCategory,
                description: `High-quality ${productName} designed for maximum protection and comfort in hazardous environments.`,
                price: 99.99
            });
        }
    });

    return products;
}

const allProducts = getProducts(PHOTOS_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ products: allProducts }, null, 4));

console.log(`Generated ${allProducts.length} products in ${OUTPUT_FILE}`);
