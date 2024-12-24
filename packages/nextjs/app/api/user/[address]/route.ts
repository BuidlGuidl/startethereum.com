import { NextResponse } from "next/server";
import { findUserByAddress } from "~~/services/database/repositories/users";

export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
    const users = await findUserByAddress(params.address);

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
