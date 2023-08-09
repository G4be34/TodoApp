"use client"

import React, { useState } from "react"
import styles from "./navbar.module.css"
import Link from "next/link"
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle"
import { signOut, useSession } from "next-auth/react"

const links = [
  {
    id: 1,
    title: "Home",
    url: "/"
  },
  {
    id: 2,
    title: "Todo's",
    url: "/todo"
  },
  {
    id: 3,
    title: "Contact",
    url: "/contact"
  },
  {
    id: 4,
    title: "About",
    url: "/about"
  },
];

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const session = useSession();

  const handleLogout = () => {
    setLoggedIn(false);
    signOut();
  }

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>Todo App</Link>
      <div className={styles.links}>
        <DarkModeToggle/>
        {links.map(link => (
          <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
        ))}
        {session.status === "authenticated"
          ? <Link href={"todo/login"}><button className={styles.button} onClick={handleLogout}>Logout</button></Link>
          : <Link href={"todo/login"}><button className={styles.button} >Login</button></Link>}
      </div>
    </div>
  )
}

export default Navbar;