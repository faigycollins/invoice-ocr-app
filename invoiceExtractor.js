const Tesseract = require('tesseract.js');

const [,, imagePath] = process.argv;

if (!imagePath) {
  console.error('Usage: node invoiceExtractor.js <image-path>');
  process.exit(1);
}

Tesseract.recognize(imagePath, 'eng')
  .then(({ data: { text } }) => {
    console.log(text);
  })
  .catch(err => {
    console.error('OCR failed:', err.message);
    process.exit(1);
  });
