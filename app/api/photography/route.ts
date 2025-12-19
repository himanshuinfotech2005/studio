import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const photoSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string().url()).min(1), // Array of image URLs
  published: z.boolean().optional().default(false),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "6");
    const lastId = searchParams.get("lastId");

    let query = db.collection("photography").orderBy("createdAt", "desc").limit(limit);

    if (lastId) {
      const lastDoc = await db.collection("photography").doc(lastId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    
    const items = snapshot.docs.map((doc) => ({
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
    return NextResponse.json({ error: "Failed to fetch photography" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = photoSchema.parse(body);

    const docRef = await db.collection("photography").add({
      ...parsed,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}