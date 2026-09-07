import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email, resetUrl) => {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your AI Chat password",
    html: `
      <h2>Reset your password</h2>
      <p>We received a request to reset your AI Chat password.</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link expires in 15 minutes.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  });
};