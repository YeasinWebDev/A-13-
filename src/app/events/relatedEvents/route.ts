import { connectDb } from "@/lib/conectDb"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request:NextRequest) =>{
    const {category} = await request.json()
    console.log(category)

    try {
        const db = await connectDb()
        if (!db) {
            return new NextResponse(
                JSON.stringify({ message: "Database connection failed" }),
                { status: 500 }
            )
        }

        const eventsCollection = await db.collection('events')
        const events = await eventsCollection.find({'category' : category}).toArray()
        return  NextResponse.json({events}, {status: 200})

    } catch (error) {
        return  NextResponse.json(
            JSON.stringify({ message: "Error fetching events" }),
            { status: 500 }
        )

    }
}