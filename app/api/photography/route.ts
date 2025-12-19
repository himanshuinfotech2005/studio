import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

// Define validation schema
const photographySchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.url("Invalid image URL"),
  published: z.boolean(),
});

export async function GET(req: NextRequest) {
  try {
    // Admin SDK syntax
    const snapshot = await db.collection("photography").orderBy("createdAt", "desc").get();
    
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Convert Timestamp to ISO string for JSON serialization
      createdAt: doc.data().createdAt?.toDate().toISOString(), 
    }));

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch photography" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = photographySchema.parse(body);

    // Admin SDK syntax
    const docRef = await db.collection("photography").add({
      ...parsed,
      createdAt: new Date(), // Use standard Date or admin.firestore.Timestamp
      updatedAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create entry", message: String(error) },
      { status: 500 }
    );
  }
}