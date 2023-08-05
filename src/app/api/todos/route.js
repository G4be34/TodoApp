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
    return new NextResponse("Error obtaining todos", { status: 500 });
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
    return new NextResponse("Error adding todo", { status: 500 });
  }
};

export const DELETE = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = "DELETE FROM todos WHERE id = $1;";
  const value = [id];

  try {
    await pool.query(query, value);
    return new NextResponse("Todo has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting todo from DB", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let importance = url.searchParams.get("importance");
  const query = "UPDATE todos SET important = $2 WHERE id = $1;";

  if (importance === "true") {
    importance = false;
  } else {
    importance = true;
  }

  const value = [id, importance];

  try {
    await pool.query(query, value);
    return new NextResponse("Importance has been updated", { status: 201 });
  } catch (error) {
    return new NextResponse("Error changing todo importance", { status: 500 });
  }
};