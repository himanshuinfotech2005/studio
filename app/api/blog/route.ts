import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.array(
    z.object({
      type: z.enum(["paragraph", "heading1", "heading2", "heading3"]),
      content: z.string().min(1)
    })
  ).min(1, "Description is required"),
  images: z.array(z.string().url()).optional().default([])
});

export async function GET(req: NextRequest) {
  try {
    const snap = await getDocs(collection(db, "blog"));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = blogSchema.parse(body);
    const ref = await addDoc(collection(db, "blog"), {
      ...parsed,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "issues" in error) {
      return NextResponse.json({ error: "Validation failed", issues: (error as ZodError).issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create blog", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}