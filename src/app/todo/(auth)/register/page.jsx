"use client"

import React, { useState } from "react"
import styles from "./page.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [matchPws, setMatchPws] = useState(true);
  const [error, setError] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPw = e.target[3].value;

    if (password !== confirmPw) {
      setMatchPws(false);
      console.log(`Passwords do not match. Password: ${password}, Confirm PW: ${confirmPw}`);
    } else {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        });
        if (res.status === 409) {
          setExistingUser(true);
          return;
        }
        res.status === 201 && router.push("/todo/login?success=Account has been created");
      } catch (error) {
        setError(true);
        console.log("Error registering new user: ", error);
      }
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
        {existingUser && <p className={styles.error}>Email already exists</p>}
        {!matchPws && <p className={styles.error}>Passwords do not match</p>}
        <button className={styles.button}>Register</button>
      </form>
      {error && <p className={styles.error}>Something went wrong!</p>}
      <Link className={styles.link} href="/todo/login">Login with an existing account</Link>
    </div>
  )
}

export default Register;