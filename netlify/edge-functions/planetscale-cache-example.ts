import type { Context } from "https://edge.netlify.com/";
import { connect } from "https://unpkg.com/@planetscale/database@^1.4.0";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request: Request, context: Context) => {
  const config = {
    host: Deno.env.get("DATABASE_HOST"),
    username: Deno.env.get("DATABASE_USERNAME"),
    password: Deno.env.get("DATABASE_PASSWORD"),
  };

  const conn = connect(config);

  const res = await conn.execute("SELECT * FROM products;", []);
  const products = res.rows;

  const response = await context.next();

  const productsHTML = products.map((product) => `<p>${product.name}</p>`);

  return new HTMLRewriter()
    .on("div#products", {
      element(element) {
        element.replace(`<div id="products">${productsHTML.join("")}</div>`, {
          html: true,
        });
      },
    })
    .transform(response);
};
