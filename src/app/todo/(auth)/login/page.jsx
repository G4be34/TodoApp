"use client"

import React, { useEffect, useState } from "react"
import styles from "./page.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [badLogin, setBadLogin] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router?.push("/todo");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signIn("credentials", { email, password });
    } catch (error) {
      setBadLogin(true);
      console.log("Error sigining in: ", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to Todo</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className={styles.input} required/>
        <input type="password" placeholder="Password" className={styles.input} required/>
        <button className={styles.button}>Login</button>
      </form>
      <button className={styles.button + " " + styles.google} onClick={() => signIn("google")}>Login with Google</button>
      <span className={styles.or}>- OR -</span>
      <Link href="/todo/register" className={styles.link}>
        Create a new account
      </Link>
    </div>
  )
}

export default Login;