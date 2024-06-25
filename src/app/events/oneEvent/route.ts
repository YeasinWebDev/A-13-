
import { connectDb } from "@/lib/conectDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request:{ json: () => Promise<{ id: string }> }) => {
  const { id } = await request.json();  // Parse the JSON body to get the ID
  console.log('Received ID:', id);

  try {
    const db = await connectDb();
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const eventCollection = db.collection("events");
    const event = await eventCollection.findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
};
