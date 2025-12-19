import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const filmSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  videoUrl: z.string().url("Invalid Video URL"),
  published: z.boolean().optional().default(false),
});

export async function GET(req: NextRequest) {
  try {
    const snapshot = await db.collection("films").orderBy("createdAt", "desc").get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch films", message: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = filmSchema.parse(body);
    
    const docRef = await db.collection("films").add({
      ...parsed,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create film", message: String(error) },
      { status: 500 }
    );
  }
}