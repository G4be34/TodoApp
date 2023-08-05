"use client"

import React, { useState } from "react"
import styles from "./todoItem.module.css"

const TodoItem = ({ todo, mutate }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleComplete = () => {
    console.log("Completed completion of Todo Task");
  }

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
  }

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
  }

  return (
    <li className={styles.container}>
      <p className={styles.desc}>{todo.todo_body}</p>
      <div className={styles.info}>
        {showMenu && (
          <div className={styles.menu}>
            <button className={styles.buttons}>Edit</button>
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