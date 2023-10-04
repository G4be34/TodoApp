"use client"

import React, { useEffect, useMemo, useState } from "react"
import styles from "./page.module.css"
import TodoItem from "@/src/components/TodoItem/TodoItem";
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Todo } from "@/lib/types";


const Todo = () => {
  const session = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);
  const [sort, setSort] = useState("newest");
  const [sortCompleted, setSortCompleted] = useState("date completed");
  const [showMenu, setShowMenu] = useState(false);

  const fetcher = (...args: [RequestInfo]) => fetch(...args).then(res => res.json());

  const username = session.data?.user?.name;

  const { data, mutate, error, isLoading } = useSWR(`/api/todos?username=${username}`, fetcher);

  const formatDate = (dateString: string): string => {
    const parsedDate = Date.parse(dateString);

    return format(new Date(dateString), "yyyy-MM-dd");
  };

  useEffect(() => {
    if (data) {
      const todosList = data.filter((item: Todo) => {
        const newDate = formatDate(item.date_created);
        item.date_created = newDate;
        return !item.completed_date;
      });
      const completedList = data.filter((item: Todo) => {
        const newDate = formatDate(item.completed_date);
        item.completed_date = newDate;
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

  const sortTodosList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    let newList = [...todos];
    if (mode === "newest") {
      newList.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    }
    if (mode === "oldest") {
      newList.sort((a, b) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime());
    }
    if (mode === "importance") {
      newList.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
    }
    setTodos(newList);
  }

  const sortCompletedList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    let newList = [...completed];

    if (mode === "date completed") {
      newList.sort((a: Todo, b: Todo) => new Date(b.completed_date).getTime() - new Date(a.completed_date).getTime());
    }
    if (mode === "date added") {
      newList.sort((a: Todo, b: Todo) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    }

    setCompleted(newList);
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const newTodo = (e.currentTarget[0] as HTMLInputElement).value;
    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newTodo,
          username: username
        })
      });
      mutate()
      e.currentTarget.reset();
    } catch (error) {
      console.log("Error adding new todo: ", error);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.mainContainer} >
        <form onSubmit={handleAdd} className={styles.form}>
          <input type="text" placeholder="Add a new Todo" className={styles.input} name="newTodo" />
          <button className={styles.button}>Add</button>
        </form>
        <div className={styles.container}>
          <div className={styles.uncompleted}>
            <div className={styles.sortContainer}>
              <span className={styles.label}>Your Todos</span>
              <div className={styles.optionContainer}>
                <span className={styles.sort}>Sort By: </span>
                <select className={styles.options} onChange={sortTodosList}>
                  <option>-Select Option-</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="importance">Importance</option>
                </select>
              </div>
            </div>
            <ul className={styles.listContainer}>
              {todos?.map(todo =>
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  mutate={mutate}
                  />)}
            </ul>
          </div>
          <div className={styles.completed}>
            <div className={styles.sortContainer}>
              <span className={styles.label}>Completed</span>
              <div className={styles.optionContainer}>
                <span className={styles.sort}>Sort By: </span>
                <select className={styles.options} onChange={sortCompletedList}>
                  <option>-Select Option-</option>
                  <option value="date completed">Date Completed</option>
                  <option value="date added">Date Added</option>
                </select>
              </div>
            </div>
            <ul className={styles.listContainer}>
              {completed?.map(todo => <TodoItem key={todo.id} todo={todo} mutate={mutate}/>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo;