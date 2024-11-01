import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const headersList = headers();

  const token = headersList.get("cookie")?.split("=")[1];
  
  return NextResponse.json({ token });
}
