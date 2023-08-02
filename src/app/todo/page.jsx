"use client"

import React, { useEffect, useMemo, useState } from "react"
import styles from "./page.module.css"
import TodoItem from "@/components/TodoItem/TodoItem";
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Todo = () => {
  const session = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/todos?username=${session?.data?.user.name}`, fetcher);

  const sortLists = (list) => {
    if (list) {
      const todosList = list.filter(item => {
        return !item.completed_date;
      });
      const completedList = list.filter(item => {
        return item.completed_date;
      });

      setTodos(todosList);
      setCompleted(completedList);
    }
  };

  const sortedList = useMemo(() => {
    return sortLists(data);
  }, [data]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router?.push("/todo/login");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  const handleAdd = async (e) => {
    e.preventDefault();

    const newTodo = e.target[0].value;
    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newTodo,
          username: session.data.user.name
        })
      });
      mutate()
      e.target.reset();
    } catch (error) {
      console.log("Error adding new todo: ", error);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.mainContainer}>
        <form onSubmit={handleAdd} className={styles.form}>
          <input type="text" placeholder="Add a new Todo" className={styles.input} />
          <button className={styles.button}>Add</button>
        </form>
        <div className={styles.container}>
          <div className={styles.uncompleted}>
            <div className={styles.sortContainer}>
              <span className={styles.label}>Your Todos</span>
              <div className={styles.optionContainer}>
                <span className={styles.sort}>Sort By: </span>
                <select className={styles.options}>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Importance</option>
                </select>
              </div>
            </div>
            <ul className={styles.listContainer}>
              {todos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </ul>
          </div>
          <div className={styles.completed}>
            <div className={styles.sortContainer}>
              <span className={styles.label}>Completed</span>
              <div className={styles.optionContainer}>
                <span className={styles.sort}>Sort By: </span>
                <select className={styles.options}>
                  <option>Date Completed</option>
                  <option>Date Added</option>
                </select>
              </div>
            </div>
            <ul className={styles.listContainer}>
              {completed?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo;