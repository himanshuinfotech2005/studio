import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  details: z.string().min(1, "Details are required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().optional(),
  days: z.string().optional(),
});

// GET: Fetch all inquiries (for Admin)
export async function GET(req: NextRequest) {
  try {
    const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
    
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// POST: Submit new inquiry (for Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.parse(body);

    await db.collection("contacts").add({
      ...parsed,
      createdAt: new Date(),
      read: false, // Status flag
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// DELETE: Remove inquiry (for Admin)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.collection("contacts").doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}