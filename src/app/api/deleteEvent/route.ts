import { connectDb } from "@/lib/conectDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: { eventId: string } = await req.json();
  const { eventId } = body;
  console.log(eventId);

  try {
    const db = await connectDb();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const eventCollection = db.collection("events");
    const orderCollection = db.collection("orders");
    const deletedResult = await eventCollection.deleteOne({ eventId });
    const deletedResult2 = await orderCollection.deleteOne({
      eventId: String(eventId),
    });

    return NextResponse.json({ deletedResult });
  } catch (error) {
    return NextResponse.json({ massage: "event didn't deleted" });
  }
};
