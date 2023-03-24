import type { APIRoute } from 'astro';
//@ts-ignore
import { main } from '../mailer';

export const post: APIRoute = ({ request }) => {
  main();
  return {
    body: JSON.stringify({
      message: 'This was a POST!',
    }),
  };
};
