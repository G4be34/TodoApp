import { NextResponse } from "next/server";
import pool from "@/utils/db";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {
    const queryString = "SELECT * FROM todos WHERE user_id = $1;";
    const value = [username];

    await pool.query(queryString, value);

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  try {
    console.log("This is the body: ", body);

  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};