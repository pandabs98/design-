import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Clear refresh token from DB
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = "";
      await user.save();
    }

    // Clear cookies
    const res = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    res.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return res;

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
