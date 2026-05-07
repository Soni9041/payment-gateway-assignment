import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const rand = Math.random();

  if (rand < 0.6) {
    console.log("NextResponse",NextResponse)
    return NextResponse.json({ status: "SUCCESS" });
  }

  if (rand < 0.85) {
    return NextResponse.json({
      status: "FAILED",
      reason: "Insufficient funds",
    });
  }

  // timeout simulation (8 sec)
  await new Promise((res) => setTimeout(res, 8000));
  return NextResponse.json({ status: "TIMEOUT" });
}