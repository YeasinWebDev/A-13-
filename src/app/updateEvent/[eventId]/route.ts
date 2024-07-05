import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDb } from "@/lib/conectDb";

export async function PUT(req: UpdateEventRequest, res: NextResponse) {
  const id = req.url.split("/updateEvent/")[1];
  const {
    name,
    category,
    description,
    location,
    startDate,
    endDate,
    price: priceData,
    by,
    byEmail,
    image,
  } = await req.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const db = await connectDb();
  if (!db) return;
  const collection = db.collection("events");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
        category,
        description,
        location,
        startDate,
        endDate,
        price: priceData,
        by,
        byEmail,
        image,
      },
    }
  );

  return NextResponse.json({ message: "Event updated successfully" });
}

interface UpdateEventRequest extends NextRequest {
  query: {
    eventId: string;
  };
}
