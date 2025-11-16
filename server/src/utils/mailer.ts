import nodemailer from "nodemailer";

export const sendResetEmail = async (to: string, link: string) => {
  // Use Mailtrap or console fallback
  if (!process.env.EMAIL_USER) {
    console.log(`Reset link for ${to}: ${link}`);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    from: '"IntelliSQR Demo" <no-reply@example.com>',
    to,
    subject: "Password reset",
    text: `Reset your password using: ${link}`,
    html: `<p>Reset your password using link below:</p><a href="${link}">${link}</a>`
  });
};
