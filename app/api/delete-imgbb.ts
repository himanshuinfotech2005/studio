import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { deleteUrl } = await request.json();
    if (!deleteUrl) {
      return NextResponse.json({ error: "No deleteUrl provided" }, { status: 400 });
    }
    const res = await fetch(deleteUrl, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}