import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const photographySchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.string().url("Invalid image URL"),
  published: z.boolean(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const docRef = db.collection("photography").doc((await params).id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const parsed = photographySchema.parse(body);

    const docRef = db.collection("photography").doc((await params).id);
    await docRef.update({
      ...parsed,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const docRef = db.collection("photography").doc((await params).id);
    await docRef.delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}