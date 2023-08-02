import { NextResponse } from "next/server";
import pool from "@/utils/db";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {
    const queryString = "SELECT * FROM todos WHERE username = $1;";
    const value = [username];

    const todos = await pool.query(queryString, value);

    return new NextResponse(JSON.stringify(todos.rows), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const POST = async (request) => {
  const {newTodo, username } = await request.json();
  const query = "INSERT INTO todos (completed_date, todo_body, important, username) VALUES ($1, $2, $3, $4);";
  const values = [null, newTodo, false, username];

  try {
    await pool.query(query, values);
    return new NextResponse("Todo has been added", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};