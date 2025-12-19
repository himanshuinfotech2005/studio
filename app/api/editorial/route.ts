import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editorialSchema = z.object({
  imageUrl: z.string().url(),
  deleteUrl: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "9");
    const lastId = searchParams.get("lastId");

    let query = db.collection("editorial").orderBy("createdAt", "desc").limit(limit);

    if (lastId) {
      const lastDoc = await db.collection("editorial").doc(lastId).get();
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
    return NextResponse.json(
      { error: "Failed to fetch editorial images" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = editorialSchema.parse(body);

    const docRef = await db.collection("editorial").add({
      ...parsed,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }
}