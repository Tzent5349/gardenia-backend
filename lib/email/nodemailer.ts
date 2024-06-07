import nodemailer from 'nodemailer';

export const sendInvoice = async (to: string, subject: string, htmlContent: string, pdfBuffer: Buffer) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // Use the app-specific password here
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Your email
    to,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: 'invoice.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};