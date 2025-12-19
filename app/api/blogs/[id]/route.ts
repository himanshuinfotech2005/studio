import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.array(
    z.object({
      type: z.enum(["paragraph", "heading1", "heading2", "heading3"]),
      content: z.string().min(1)
    })
  ).min(1, "At least one content block is required"),
  images: z.array(z.string().url()).optional().default([]),
  published: z.boolean().optional().default(false),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const docRef = db.collection("blog").doc((await params).id);
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
    const parsed = blogSchema.parse(body);

    const docRef = db.collection("blog").doc((await params).id);
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
    const docRef = db.collection("blog").doc((await params).id);
    await docRef.delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}