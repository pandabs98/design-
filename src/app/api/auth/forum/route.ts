// File: app/api/auth/forum/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Forum from "@/models/Forum";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  await dbConnect();

  const token = req.cookies.get("accessToken")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  const form = await req.formData();
  const title = form.get("title") as string;
  const description = form.get("description") as string;
  const techStack = form.get("techStack") as string;
  const imageFile = form.get("image") as File;

  if (!title || !description || !techStack || !imageFile) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataURI = `data:${imageFile.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "portfolio_forum",
    });

    const newPost = await Forum.create({
      title,
      description,
      techStack: techStack.split(",").map((item) => item.trim()),
      image: uploadRes.secure_url,
    });

    return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });
  } catch (err) {
    console.error("Error uploading or saving post:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const data = await Forum.find();
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No data found", data: [] }, { status: 200 });
    }
    return NextResponse.json({ message: "Data fetched successfully", data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
  }

  try {
    const result = await Forum.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "No document found with the given ID" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const form = await req.formData();

  const title = form.get("title")?.toString();
  const description = form.get("description")?.toString();
  const techStackRaw = form.get("techStack")?.toString();
  const imageFile = form.get("image") as File;
  const id = req.nextUrl.searchParams.get("id");

  if (!id || !title || !description || !techStackRaw || !imageFile) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const result = await Forum.findById(id);
    if (!result) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataURI = `data:${imageFile.type};base64,${base64}`;
    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "portfolio_forum",
    });

    result.title = title;
    result.description = description;
    result.image = uploadRes.secure_url;
    result.techStack = techStackRaw.split(",").map((t) => t.trim());
    await result.save();

    return NextResponse.json({ message: "Updated data successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
