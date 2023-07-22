import React from "react"
import styles from "./page.module.css"
import AddTodoBar from "@/components/AddTodoBar/AddTodoBar";

export const metadata = {
  title: 'Todo App Todos',
  description: 'This is the Todos Page',
}

const todos = [
  {
    id: 1,
    date: 1,
    desc: "Do the laundry"
  },
  {
    id: 2,
    date: 1,
    desc: "Take the trash out"
  },
  {
    id: 3,
    date: 1,
    desc: "Finish your favorite TV series"
  },
  {
    id: 4,
    date: 1,
    desc: "Wash the dishes"
  },
  {
    id: 5,
    date: 1,
    desc: "Vacuum the carpet"
  },
  {
    id: 6,
    date: 1,
    desc: "Feed the dog"
  },
  {
    id: 7,
    date: 1,
    desc: "Get some yummy foods"
  },
];

const completed = [
  {
    id: 1,
    desc: "Go to the grocery store"
  },
  {
    id: 2,
    desc: "See a therapist"
  },
  {
    id: 3,
    desc: "Pet the dog"
  }
];

const Todo = () => {

  return (
    <div className={styles.container}>
      <AddTodoBar />
      <div>
        <div>
          <div>
            <span>Your Todos</span>
            <span>Sort By: </span>
            <select>
              <option>Date</option>
              <option>Importance</option>
            </select>
          </div>

        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Todo;