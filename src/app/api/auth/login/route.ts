import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

type MinimalUser = {
  _id: string;
  email: string;
};

function generateAccessToken(user: MinimalUser) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "3d",
  });
}

function generateRefreshToken(user: MinimalUser) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const userCount = await User.countDocuments();

    // 🔰 Register first user
    if (userCount === 0) {
      const newUser = new User({ email, password }); // Password will be hashed
      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      newUser.refreshToken = refreshToken;
      await newUser.save();

      const res = NextResponse.json(
        { message: "First user registered and logged in", user: { email } },
        { status: 201 }
      );

      res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60,
        path: "/",
      });

      res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return res;
    }

    // 🧠 Normal login
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    const res = NextResponse.json(
      { message: "Login successful", user: { email: user.email } },
      { status: 200 }
    );

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60,
      path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;

  } catch (error) {
    console.error("Login/Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
