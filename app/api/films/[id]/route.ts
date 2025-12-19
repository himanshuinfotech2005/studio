import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const filmSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string().url()
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const ref = doc(db, "films", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return NextResponse.json({ error: "Film not found" }, { status: 404 });
    return NextResponse.json({ id: snap.id, ...snap.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch film", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const parsed = filmSchema.parse(body);
    const ref = doc(db, "films", id);
    await updateDoc(ref, { ...parsed, updatedAt: serverTimestamp() });
    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    if (error && typeof error === "object" && "issues" in error) {
      return NextResponse.json({ error: "Validation failed", issues: (error as ZodError).issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update film", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const ref = doc(db, "films", id);
    await deleteDoc(ref);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete film", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}