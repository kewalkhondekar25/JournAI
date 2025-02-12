import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "Journal created successfully", data: body}, { status: 200});
  } catch (error) {
    console.log(error);
  }
};