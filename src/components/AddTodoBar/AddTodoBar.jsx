"use client"

import React from "react"
import styles from "./addTodoBar.module.css"

const AddTodoBar = () => {

  const handleAdd = (e) => {
    e.preventDefault();

    const newTodo = e.target[0].value;

    console.log("Added new Todo: ", newTodo);
  };

  return (
    <form onSubmit={handleAdd} className={styles.form}>
      <input type="text" placeholder="Add a new Todo" className={styles.input} />
      <button className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodoBar;