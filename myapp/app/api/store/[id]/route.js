import db from "@/lib/db";
import Store from "@/models/Store";
import Product from "@/models/Product";

export async function GET(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const store = await Store.findById(id);
    if (!store) {
      return new Response(JSON.stringify({ error: "Store not found" }), {
        status: 404,
      });
    }

    const storeProducts = await Product.find({ store: id }).sort({
      createdAt: -1, // Note the corrected spelling of 'createdAt'
    });

    return new Response(
      JSON.stringify({ store: store, products: storeProducts }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching store and products:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
