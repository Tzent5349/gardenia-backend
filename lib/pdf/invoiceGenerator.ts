import { PDFDocument, rgb, StandardFonts, PngEmbedder } from 'pdf-lib';

export const generateInvoicePdf = async (
  detailedOrderItems: any[],
  user: any,
// Updated function signature to accept PNG buffer directly
) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Embed the PNG image into the PDF document


  // Add invoice title and user details
  page.drawText('Invoice', { x: 50, y: height - 150, size: 30, color: rgb(0, 0, 0) });
  page.drawText(`User: ${user.firstName} ${user.lastName}`, { x: 50, y: height - 200, size: 15 });
  page.drawText(`Email: ${user.email}`, { x: 50, y: height - 220, size: 15 });

  // Add table headers
  let yPosition = height - 250;
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawText('Product', { x: 50, y: yPosition, size: 12, font: boldFont });
  page.drawText('Quantity', { x: 150, y: yPosition, size: 12, font: boldFont });
  page.drawText('Price', { x: 250, y: yPosition, size: 12, font: boldFont });
  page.drawText('Size', { x: 350, y: yPosition, size: 12, font: boldFont });
  page.drawText('Color', { x: 450, y: yPosition, size: 12, font: boldFont });

  // Add product details
  yPosition -= 20;
  detailedOrderItems.forEach(item => {
    page.drawText(item.name, { x: 50, y: yPosition, size: 12 });
    page.drawText(`${item.quantity}`, { x: 150, y: yPosition, size: 12 });
    page.drawText(`${item.price}`, { x: 250, y: yPosition, size: 12 });
    page.drawText(item.size, { x: 350, y: yPosition, size: 12 });
    page.drawText(item.colorName, { x: 450, y: yPosition, size: 12 });
    yPosition -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};