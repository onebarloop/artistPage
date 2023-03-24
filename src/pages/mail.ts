import type { APIRoute } from 'astro';

import nodemailer from 'nodemailer';

const mailHost = import.meta.env.EMAIL_HOST;
const mailUser = import.meta.env.EMAIL_USER;
const mailPass = import.meta.env.EMAIL_PASSWORD;

//Mail-Function
async function mail(text: string) {
  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  let info = await transporter.sendMail({
    from: mailUser,
    to: 'XXX',
    subject: 'Hello ✔',
    text: text,
    html: `<b>${text}</b>`,
  });

  console.log('Message sent: %s', info);
}

// API-Route
export const post: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json();
    const text = body.text;
    mail(text).catch(console.error);
    return new Response(
      JSON.stringify({
        message: 'Danke für die Nachricht',
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
};
