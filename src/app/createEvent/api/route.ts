import { connectDb } from "@/lib/conectDb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const event = await request.json();
  console.log(event);
  try {
    const db = await connectDb();
    if (!db) {
      return NextResponse.json(
        { error: "Failed to connect to database" },
        { status: 500 }
      );
    }
    const eventCollection = db.collection("events");

    const lastBioData = await eventCollection
      .find()
      .sort({ eventId: -1 })
      .limit(0)
      .toArray();

    const eventId =
      lastBioData.length > 0 ? parseInt(lastBioData[0].eventId) + 1 : 1;

      
    await eventCollection.insertOne({ ...event, eventId });

    return NextResponse.json({ massage: "Event Added" });
  } catch (error) {}
};
