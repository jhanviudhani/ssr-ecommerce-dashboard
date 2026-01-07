import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

/* ========= SIGN UP ========= */
export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  const martId = `mart_${email}`;

  const user = await User.create({
    email,
    password,
    martId,
  });

  return NextResponse.json({
    message: "Signup successful",
    user: {
      email: user.email,
      martId: user.martId,
    },
  });
}

/* ========= LOGIN ========= */
export async function PUT(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "Account not found" },
      { status: 404 }
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Login successful",
    user: {
      email: user.email,
      martId: user.martId,
    },
  });
}
