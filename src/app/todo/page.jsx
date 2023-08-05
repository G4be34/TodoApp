"use client"

import React, { useEffect, useMemo, useState } from "react"
import styles from "./page.module.css"
import TodoItem from "@/components/TodoItem/TodoItem";
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";


const Todo = () => {
  const session = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [sort, setSort] = useState("newest");

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/todos?username=${session?.data?.user.name}`, fetcher);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const sortedList = useMemo(() => {
    if (data) {
      const todosList = data.filter(item => {
        const newDate = formatDate(item.date_created);
        item.date_created = newDate;
        return !item.completed_date;
      });
      const completedList = data.filter(item => {
        const newDate = formatDate(item.date_created);
        item.date_created = newDate;
        return item.completed_date;
      });

      setTodos(todosList);
      setCompleted(completedList);
    }
  }, [data]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router?.push("/todo/login");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  const sortList = (e) => {
    const mode = e.target.value;
    let newList = [...todos];

    if (mode === "newest") {
      newList.sort((a, b) => b.date_created - a.date_created);
    }
    if (mode === "oldest") {
      newList.sort((a, b) => a.date_created - b.date_created);
    }
    if (mode === "importance") {
      newList.sort((a, b) => b.importance - a.importance);
    }
    setTodos(newList);
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
                <select className={styles.options} onChange={sortList}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="importance">Importance</option>
                </select>
              </div>
            </div>
            <ul className={styles.listContainer}>
              {todos?.map(todo => <TodoItem key={todo.id} todo={todo} mutate={mutate} />)}
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