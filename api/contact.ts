import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, interest, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailmun.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILMUN_USERNAME,
      pass: process.env.MAILMUN_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.MAILMUN_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission - ${interest}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send auto-reply to user
    await transporter.sendMail({
      from: process.env.MAILMUN_FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting EduPath AI',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message regarding ${interest}. Our team will review your inquiry and get back to you within 24 hours.</p>
        <p>Best regards,<br>EduPath AI Team</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}