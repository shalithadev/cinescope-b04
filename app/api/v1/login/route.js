import { NextResponse } from "next/server";

const VALID_EMAIL = "shalithadev@gmail.com";
const VALID_PASSWORD = "12345678";

export const POST = async (request) => {
  const { email, password } = await request.json();

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return NextResponse.json({ success: true, message: "Login successful" });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
};
