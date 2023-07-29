"use client"

import React, { useEffect } from "react"
import styles from "./page.module.css"
import AddTodoBar from "@/components/AddTodoBar/AddTodoBar";
import TodoItem from "@/components/TodoItem/TodoItem";
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const todos = [
  {
    id: 1,
    important: true,
    date: "2023-07-10",
    description: "Do the laundry",
    completedDate: "",
    completed: false
  },
  {
    id: 2,
    important: false,
    date: "2023-06-10",
    description: "Take the trash out",
    completedDate: "",
    completed: false
  },
  {
    id: 3,
    important: false,
    date: "2022-07-05",
    description: "Finish your favorite TV series",
    completedDate: "",
    completed: false
  },
  {
    id: 4,
    important: true,
    date: "2023-07-16",
    description: "Wash the dishes",
    completedDate: "",
    completed: false
  },
  {
    id: 5,
    important: false,
    date: "2023-07-17",
    description: "Vacuum the carpet",
    completedDate: "",
    completed: false
  },
  {
    id: 6,
    important: false,
    date: "2023-05-10",
    description: "Feed the dog",
    completedDate: "",
    completed: false
  },
  {
    id: 7,
    important: true,
    date: "2023-07-12",
    description: "Get some yummy foods",
    completedDate: "",
    completed: false
  },
  {
    id: 11,
    important: true,
    date: "2023-07-12",
    description: "This is just a test just to see how many words I can fit within this text box",
    completedDate: "",
    completed: false
  },
];

const completed = [
  {
    id: 8,
    completed: true,
    date: "2023-05-17",
    important: false,
    description: "Go to the grocery store",
    completedDate: "2023-05-20"
  },
  {
    id: 9,
    completed: true,
    date: "2023-07-17",
    important: false,
    description: "See a therapist",
    completedDate: "2023-07-18"
  },
  {
    id: 10,
    completed: true,
    date: "2023-06-17",
    important: false,
    description: "Pet the dog",
    completedDate: "2023-06-25"
  }
];

const Todo = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/todos?username=${session?.data?.user.name}`, fetcher);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router?.push("/todo/login");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>
  }


  if (session.status === "authenticated") {
    return (
      <div className={styles.mainContainer}>
        <AddTodoBar />
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