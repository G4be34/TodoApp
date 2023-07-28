import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/utils/db";

export const POST = async (request) => {
  const { name, email, password} = await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  const queryString = "INSERT INTO users (email, user_password, name) VALUES ($1, $2, $3);";
  const values = [email, hashedPassword, name];

  try {
    await pool.query(queryString, values);
    return new NextResponse("User has been created", {
      status: 201
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500
    });
  }
}