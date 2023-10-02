"use client"

import React, { useState } from "react"
import styles from "./todoItem.module.css"
import { MutatorCallback } from "swr"
import { Todo } from "@/lib/types"


type TodoItemProps = {
  todo: Todo,
  mutate: MutatorCallback
}

const TodoItem = ({ todo, mutate }: TodoItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.todo_body);

  const handleComplete = async () => {
    try {
      await fetch(`/api/todos?id=${todo.id}&completed=true`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      });
      mutate();
    } catch (error) {
      console.log("Error completing todo: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch (`/api/todos?id=${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      mutate();
    } catch (error) {
      console.log("Error deleting todo: ", error);
    }
  };

  const addImportance = async () => {
    try {
      await fetch(`/api/todos?id=${todo.id}&importance=${todo.important}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      });
      mutate();
    } catch (error) {
      console.log("Error updating todo item importance: ", error);
    }
  };

  const editTodo = async () => {
    setEditMode(false);
    if (showMenu) {
      setShowMenu(false);
    }
    try {
      await fetch(`/api/todos?id=${todo.id}&body=${newTodo}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      });
      mutate();
    } catch (error) {
      console.log("Error saving new todo edit: ", error);
    }
  };

  const closeMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  }

  return (
    <li className={styles.container} onClick={closeMenu}>
      {editMode
        ? <div className={styles.editContainer}>
            <input className={styles.input} type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={editTodo} className={styles.save}>Save</button>
          </div>
        : <p className={styles.desc}>{(todo.todo_body[0].toUpperCase()) + (todo.todo_body.slice(1))}</p>
        }
      <div className={styles.info}>
        {showMenu && (
          <div className={styles.menu}>
            <button className={styles.buttons} onClick={() => setEditMode(!editMode)}>Edit</button>
            <button className={styles.buttons} onClick={handleDelete}>Delete</button>
          </div>
        )}
        {todo.completed_date
          ? null
          : <div className={styles.optionsContainer}>
              <h2 className={styles.options} onClick={() => setShowMenu(!showMenu)} >...</h2>
            </div>
          }
        <p className={styles.date}>{todo.date_created}</p>
        <div className={styles.buttonContainer}>
          {!todo.completed_date && (todo.important
            ? <p className={styles.importantLabel}>Important</p>
            : <button className={styles.important} onClick={addImportance}>Important</button>
          )}
          {todo.completed_date
            ? <p>Completed on: {todo.completed_date}</p>
            : <button className={styles.complete} onClick={handleComplete}>Complete</button>
            }
        </div>
      </div>

    </li>
  )
}

export default TodoItem;