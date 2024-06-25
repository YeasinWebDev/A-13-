import { connectDb } from "@/lib/conectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDb();
  const eventCollection = await db?.collection("events");
  const events = await eventCollection?.find({}).toArray();
  return NextResponse.json({ events }, { status: 200 });
};
