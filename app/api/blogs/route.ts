import { db } from "@/lib/firebase";
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
  ).min(1, "At least one content block is required"),
  images: z.array(z.string().url()).optional().default([]),
  published: z.boolean().optional().default(false),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "6");
    const lastId = searchParams.get("lastId");
    const isAdmin = searchParams.get("admin") === "true";

    let query: any = db.collection("blog");

    // Only filter by published if NOT admin
    if (!isAdmin) {
      query = query.where("published", "==", true);
    }

    query = query.orderBy("createdAt", "desc").limit(limit);

    if (lastId) {
      const lastDoc = await db.collection("blog").doc(lastId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    
    const items = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));

    return NextResponse.json({
      items,
      lastId: items.length > 0 ? items[items.length - 1].id : null,
      hasMore: items.length === limit
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", message: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = blogSchema.parse(body);

    const docRef = await db.collection("blog").add({
      ...parsed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create blog", message: String(error) },
      { status: 500 }
    );
  }
}