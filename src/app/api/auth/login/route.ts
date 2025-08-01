// File: app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

type MinimalUser = {
  _id: string;
  email: string;
};

function generateAccessToken(user: MinimalUser) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "3d" });
}

function generateRefreshToken(user: MinimalUser) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const existingUser = await User.findOne();

    // Login
    if (existingUser) {
      const isMatch = await existingUser.comparePassword(password);
      if (!isMatch || email !== existingUser.email) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
      }

      const accessToken = generateAccessToken(existingUser);
      const refreshToken = generateRefreshToken(existingUser);

      existingUser.refreshToken = refreshToken;
      await existingUser.save();

      const res = NextResponse.json(
        { message: "Login successful", user: { email } },
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
    }

    // Register (only 1 user allowed)
    const newUser = new User({ email, password });
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    const res = NextResponse.json(
      { message: "User registered successfully", user: { email } },
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

  } catch (error) {
    console.error("Login/Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
