import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Updated schema to match client data
const photographySchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  // Changed from coverImage to images array to match client
  images: z.array(z.string()).default([]), 
  published: z.boolean(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const docRef = db.collection("photography").doc(id);
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
    const { id } = await params;
    const body = await req.json();
    
    // Validate body against the new schema
    const parsed = photographySchema.parse(body);

    const docRef = db.collection("photography").doc(id);
    await docRef.update({
      ...parsed,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error); // Log error for debugging
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const docRef = db.collection("photography").doc(id);
    await docRef.delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}