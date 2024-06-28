import { connectDb } from "@/lib/conectDb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const db = await connectDb();
    if (!db) {
      return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
    }

    const eventCollection = db.collection("events");

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const filter = searchParams.get('filter') || '';
    const skip = (page - 1) * limit;

    const filterCondition = filter ? { name: { $regex: filter, $options: 'i' } } : {};

    const events = await eventCollection
      .find(filterCondition)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalEvents = await eventCollection.countDocuments(filterCondition);

    return NextResponse.json({ events, totalPages: Math.ceil(totalEvents / limit) }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
