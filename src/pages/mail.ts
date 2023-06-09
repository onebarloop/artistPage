import type { APIRoute } from 'astro';

import nodemailer from 'nodemailer';

const mailHost = import.meta.env.EMAIL_HOST;
const mailUser = import.meta.env.EMAIL_USER;
const mailPass = import.meta.env.EMAIL_PASSWORD;
const mailRecipient = import.meta.env.EMAIL_RECIPIENT;

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
    to: mailRecipient,
    subject: `Hello from ${name} // ${email === '' ? 'no adress' : email}`,
    text: text,
    html: `<p>${text}</p>`,
  });

  return info;
}

// API-Route
export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('namekjbvfd') as string;
  const email = data.get('emailkjnfd') as string;
  const text = data.get('textgkjfglk') as string;
  const honeyName = data.get('name') as string;
  const honeyEmail = data.get('email') as string;
  const honeyText = data.get('text') as string;

  if (honeyName || honeyEmail || honeyText) {
    return new Response(null, { status: 400 });
  }

  if (name && text) {
    const resp = await mail(name, email, text).catch(console.error);

    if (resp) {
      return new Response(
        JSON.stringify({
          message: 'Thank you for your message ❤️',
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 'something went wrong :(',
        }),
        { status: 500 }
      );
    }
  }
  return new Response(JSON.stringify({ message: 'Missing form field' }), {
    status: 400,
  });
};
