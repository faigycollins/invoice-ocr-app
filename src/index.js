const Tesseract = require('tesseract.js');

function parseText(text) {
  const invoiceNumberMatch = text.match(/INV-\d+/);
  const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/);
  const amountMatch = text.match(/\d+\.\d{2}/);
  const vendorMatch = text.match(/Vendor:\s*(.+)/i);
  return {
    invoiceNumber: invoiceNumberMatch ? invoiceNumberMatch[0] : null,
    date: dateMatch ? dateMatch[0] : null,
    amount: amountMatch ? parseFloat(amountMatch[0]) : null,
    vendor: vendorMatch ? vendorMatch[1].trim() : null,
  };
}

async function extractInvoiceFields(imagePath) {
  const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
  return parseText(text);
}

module.exports = { extractInvoiceFields, parseText };
