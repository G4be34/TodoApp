"use client"

import React from "react"
import styles from "./todoItem.module.css"

const TodoItem = ({ todo }) => {

  const handleComplete = () => {
    console.log("Completed completion of Todo Task");
  }

  const handleDelete = () => {
    console.log("Completed deletion of Todo Task");
  }

  return (
    <li className={styles.container}>
      <p className={styles.desc}>{todo.todo_body}</p>
      <div className={styles.info}>
        <p className={styles.date}>{todo.date_created}</p>
        <div className={styles.buttonContainer}>
          {!todo.completed_date && (todo.important
            ? <p className={styles.importantLabel}>Important</p>
            : <button className={styles.important}>Important</button>
          )}
          {todo.completed_date
            ? <p>Completed on: {todo.completed_date}</p>
            : <button className={styles.complete} onClick={handleComplete}>Complete</button>
            }
        </div>
      </div>
      {todo.completed_date
        ? null
        : <button className={styles.delete} onClick={handleDelete} >X</button>
        }
    </li>
  )
}

export default TodoItem;