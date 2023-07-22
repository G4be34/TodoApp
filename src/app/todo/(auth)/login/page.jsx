"use client"

import React from "react"
import styles from "./page.module.css"
import Link from "next/link";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log("Login attempt with: ", email, password)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to Todo</h1>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} required/>
        <input type="password" placeholder="Password" className={styles.input} required/>
        <button className={styles.button}>Login</button>
      </form>
      <button className={styles.button + " " + styles.google}>Login with Google</button>
      <span className={styles.or}>- OR -</span>
      <Link href="/todo/register" className={styles.link}>
        Create a new account
      </Link>
    </div>
  )
}

export default Login;