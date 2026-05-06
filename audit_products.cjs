const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8')).products;

const codesToCheck = [
    // Eye Protection
    'RIMFIPO', 'RIMFIMI', 'PACAYLVFU', 'PACAYLVIN', 'PACAYBLIN', 
    'PACAYNOFU', 'PACAYSTIN', 'PACAYSTFU', 'PACAYLVSTIN', 
    'HELI2BB', 'HELI2DE', 'HELI2IN', 'HELI2FU', 'FUJI2NDIN', 'FUJI2NDOR',
    'IRAYAIN', 'IRAYAJA', 'IRAYAFU', 'MEIAIN', 'MEIAFU', 'MILOIN', 'MILOFU',
    'BRAV2IN', 'BRAV2FU', 'BRAV2INAB', 'KILIMGRIN', 'KILIMNOFU100', 'KILIMGRINAB',
    'LIPA2BLIN', 'LIPA2T5', 'PITO2IN', 'LUCERNEIN100', 'ASO2IN',
    'ASO2FU', 'IRAZUIN', 'GALERVI', 'RUIZ1VI', 'EGONGRIN', 'EGONGRFU', 'FILMG', 'HARUNIN', 'HEKL2IN',
    // Head Protection
    'COLTAAINOMI', 'COLTAAIGRMI', 'COLTAAINOSH', 'COLTAAIBMSH', 'COLTAAIBM', 'COLTAAIJAFL', 'FUEGOARIN', 'HARNE4'
];

const found = [];
const missing = [];

codesToCheck.forEach(code => {
    const product = products.find(p => 
        p.reference.includes(code) || 
        (p.itemCode && p.itemCode === code)
    );
    if (product) found.push(code);
    else missing.push(code);
});

console.log(JSON.stringify({
    total: codesToCheck.length,
    foundCount: found.length,
    missingCount: missing.length,
    found,
    missing
}, null, 2));
