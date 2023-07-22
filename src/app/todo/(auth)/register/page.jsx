"use client"

import React from "react"
import styles from "./page.module.css"
import Link from "next/link";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPw = e.target[3].value;

    if (password !== confirmPw) {
      console.log(`Passwords do not match. Password: ${password}, Confirm PW: ${confirmPw}`);
    } else {
      console.log("Account created successfully");

    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className={styles.input} required />
        <input type="email" placeholder="Email" className={styles.input} required />
        <input type="password" placeholder="Password" className={styles.input} required />
        <input type="password" placeholder="Confirm Password" className={styles.input} required />
        <button className={styles.button}>Register</button>
      </form>
      <Link className={styles.link} href="/todo/login">Login with an existing account</Link>
    </div>
  )
}

export default Register;