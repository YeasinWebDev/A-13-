
import { connectDb } from "@/lib/conectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) { 
  const {email} = await request.json()

  const db = await connectDb();
  
  if (!db) {
    return NextResponse.json({ message: "did not connect to database" });
  }

  const orderCollection = db.collection("orders");
  const ides = await orderCollection
    .find({ buyer:email })
    .toArray();

    const eventIds = ides.map(event => Number(event.eventId));

    const eventCollection =  db.collection("events");
    const eventsByEmail = await eventCollection.find({byEmail:email}).toArray()
    const events = await eventCollection.find({eventId:{ $in: eventIds }}).toArray()

  
  return NextResponse.json({events,eventsByEmail});
};
