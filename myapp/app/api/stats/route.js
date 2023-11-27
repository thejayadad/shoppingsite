import db from "@/lib/db";
import Product from "@/models/Product";
import Store from "@/models/Store";
import User from "@/models/User";

export async function GET(req) {
  await db.connect();
  try {
    const userCount = await User.countDocuments();
    const storeCount = await Store.countDocuments();
    const productCount = await Product.countDocuments();

    const stats = {
      userCount,
      storeCount,
      productCount,
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    console.error("Error fetching counts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
