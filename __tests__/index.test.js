const { extractInvoiceFields, parseText } = require('../src/index');
const Tesseract = require('tesseract.js');

jest.mock('tesseract.js');

describe('extractInvoiceFields', () => {
  it('parses fields from recognized text', async () => {
    const sampleText = `Invoice INV-123\nDate: 2025-01-22\nAmount: 1234.56\nVendor: Supplier Name`;
    Tesseract.recognize.mockResolvedValue({ data: { text: sampleText } });

    const result = await extractInvoiceFields('dummy-path');

    expect(result).toEqual({
      invoiceNumber: 'INV-123',
      date: '2025-01-22',
      amount: 1234.56,
      vendor: 'Supplier Name',
    });
  });
});

describe('parseText', () => {
  it('extracts fields directly from text', () => {
    const sampleText = `Invoice INV-123\nDate: 2025-01-22\nAmount: 1234.56\nVendor: Supplier Name`;
    const result = parseText(sampleText);
    expect(result).toEqual({
      invoiceNumber: 'INV-123',
      date: '2025-01-22',
      amount: 1234.56,
      vendor: 'Supplier Name',
    });
  });
});
