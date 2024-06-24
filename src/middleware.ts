import { NextResponse } from "next/server"

export const  middleware = async (request) =>{
    return NextResponse.next()
}