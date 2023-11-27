import db from "@/lib/db";
import Store from "@/models/Store";

export async function GET(req) {
    await db.connect();

    try {
        const stores = await Store.find({}).sort({ createdAt: -1 });
        return new Response(JSON.stringify(stores), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 });
    }
}

export async function POST(req) {
    await db.connect();
    try {
        const body = await req.json();
        const newStore = await Store.create(body);

        return new Response(JSON.stringify(newStore), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 });
    }
}
