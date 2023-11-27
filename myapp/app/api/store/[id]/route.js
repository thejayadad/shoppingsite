import db from "@/lib/db";
import Store from "@/models/Store";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const store = await Store.findById(id)

        return new Response(JSON.stringify(store), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}