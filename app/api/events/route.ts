import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface EventData {
    _id: ObjectId | undefined;
    title: string;
    organizer: [string];
    time: string;
    tagline: string;
    location: string;
    day: string;
}

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db();

    const eventData: EventData = await request.json();
    const event = await db.collection("events").insertOne(eventData);

    return NextResponse.json(event);
}

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db();

    const events = await db
        .collection("events")
        .find({day: request.headers.get("day")})
        .toArray();

    return NextResponse.json(events);
}

export async function PUT(request: Request) {
    const client = await clientPromise;
    const db = client.db();

    const eventData: EventData = await request.json();
    eventData._id = new ObjectId(eventData._id);

    const event = await db
        .collection("events")
        .updateOne({_id: eventData._id}, {$set: eventData});

    return NextResponse.json(event);
}

export async function DELETE(request: Request) {
    const client = await clientPromise;
    const db = client.db();

    const eventData: EventData = await request.json();
    eventData._id = new ObjectId(eventData._id);

    const event = await db
        .collection("events")
        .deleteOne({_id: eventData._id});

    return NextResponse.json(event);
}