
import { connectDb } from "@/lib/conectDb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request:NextRequest) => {
  const { id } = await request.json(); 
  if (typeof id !== 'string') {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

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
