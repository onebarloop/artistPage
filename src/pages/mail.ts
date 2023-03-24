import type { APIRoute } from 'astro';

import nodemailer from 'nodemailer';

const mailHost = import.meta.env.EMAIL_HOST;
const mailUser = import.meta.env.EMAIL_USER;
const mailPass = import.meta.env.EMAIL_PASSWORD;

//Mail-Function
async function mail(name: string, email: string, text: string) {
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
    to: mailUser,
    subject: `Hello from ${name} // ${email}`,
    text: text,
    html: `<b>${text}</b>`,
  });

  console.log('Message sent: %s', info);
}

// API-Route
export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const text = data.get('text') as string;

  if (name && email && text) {
    mail(name, email, text).catch(console.error);
    return new Response(
      JSON.stringify({
        message: 'Success!',
      }),
      { status: 200 }
    );
  }
  return new Response(JSON.stringify({ message: 'Missing form field' }), {
    status: 400,
  });
};

/* if (request.headers.get('Content-Type') === 'application/json') {
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
return new Response(null, { status: 400 }); */
