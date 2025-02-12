import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    return NextResponse.json({
      message: "Journal updated successfully",
      data: {
        id: 1,
        body
      }
    }, { status: 201});
  } catch (error) {
    console.log(error);
  }
};
