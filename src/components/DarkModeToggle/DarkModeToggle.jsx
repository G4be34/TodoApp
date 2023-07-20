"use client"

import React, { useContext } from "react"
import styles from "./darkModeToggle.module.css"
import { ThemeContext } from "@/context/ThemeContext"

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div className={styles.container} onClick={toggle}>
      {mode === "light" ? <div>Light Mode</div> : <div>Dark Mode</div> }
    </div>
  )
}

export default DarkModeToggle;