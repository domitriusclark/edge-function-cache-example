import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const res = await context.next();
  const page = await res.text();
  const regex = /LOCATION/i;
  const location = context.geo.city;

  const updatedPage = page.replace(regex, location);

  return new Response(updatedPage, res);
};
