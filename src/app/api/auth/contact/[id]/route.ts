import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function DELETE(
  req: NextRequest // Only NextRequest is passed, no context object
) {
  await dbConnect();

  try {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }

    // --- Start of change: Extracting ID from req.url ---
    const url = new URL(req.url);
    // Assuming the URL structure is /api/auth/contact/[id]
    // Example: /api/auth/contact/123
    const pathSegments = url.pathname.split('/');
    // The ID would be the last segment
    const id = pathSegments[pathSegments.length - 1];
    // --- End of change ---

    if (!id) {
      return NextResponse.json({ error: "Missing contact ID" }, { status: 400 });
    }

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /contact/[id] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}