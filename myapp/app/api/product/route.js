import db from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req, ctx) {
  await db.connect();
  try {
    const body = await req.json()
    const newProduct = await Product.create(body)

    return new Response(JSON.stringify(newProduct), { status: 201 })
} catch (error) {
    return new Response(JSON.stringify(null), { status: 500 })
}
}
