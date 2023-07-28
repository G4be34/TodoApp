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
      <p className={styles.desc}>{todo.description}</p>
      <div className={styles.info}>
        <p className={styles.date}>{todo.date}</p>
        {todo.completed
          ? <p>Completed on: {todo.completedDate}</p>
          : <button className={styles.complete} onClick={handleComplete}>Complete</button>
          }
      </div>
      {todo.completed
        ? null
        : <button className={styles.delete} onClick={handleDelete} >X</button>
        }
    </li>
  )
}

export default TodoItem;