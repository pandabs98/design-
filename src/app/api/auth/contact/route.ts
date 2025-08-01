import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Contact from "@/models/Contact";


export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body = await req.json();
        const { name, email, message } = body;
        if(!name || !email || !message){
            return NextResponse.json(
                {error: "All fields are required"},
                {status: 400}
            )
        }
        const data = await Contact.create({
            name,
            email,
            message
        })
        return NextResponse.json(
            {message: "Message saved successfully", data},
            {status: 201}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Data not saved to databse" },
            { status: 500 }
        )
    }
}

export async function GET(){
    await dbConnect();
    try {
        const data = await Contact.find();
        if(!data){
            return NextResponse.json(
                {error: "contact details not found", data},
                {status: 400}
            )
        }
        return NextResponse.json(
            {message: "success", data},
            {status: 200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: "no data found"},
            {status: 500}
        )
    }
}