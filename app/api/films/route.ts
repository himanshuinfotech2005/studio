import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const filmSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string().url()
});

export async function GET(req: NextRequest) {
  try {
    const snap = await getDocs(collection(db, "films"));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch films", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = filmSchema.parse(body);
    const ref = await addDoc(collection(db, "films"), {
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
      { error: "Failed to create film", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}