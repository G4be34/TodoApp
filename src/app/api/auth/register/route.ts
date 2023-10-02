import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/src/utils/db";
import { getErrorMessage } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { name, email, password} = await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  const getQuery = "SELECT * FROM users WHERE email = $1;";
  const values1 = [email];

  const postQuery = "INSERT INTO users (email, user_password, name) VALUES ($1, $2, $3);";
  const values2 = [email, hashedPassword, name];

  try {
    const foundUser = await pool.query(getQuery, values1);

    if (foundUser.rows.length > 0) {
      return new NextResponse("Email is already in use", { status: 409 });
    }
    await pool.query(postQuery, values2);
    return new NextResponse("User has been created", {
      status: 201
    });
  } catch (error: unknown) {
    const errMessage = getErrorMessage(error)
    return new NextResponse(errMessage, {
      status: 500
    });
  }
}