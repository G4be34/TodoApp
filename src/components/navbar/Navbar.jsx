"use client"

import React, { useState } from "react"
import styles from "./navbar.module.css"
import Link from "next/link"

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
  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>Todo App</Link>
      <div className={styles.links}>
        <div>Dark Mode</div>
        {links.map(link => (
          <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
        ))}
        {loggedIn
          ? <button className={styles.button}>Logout</button>
          : <button className={styles.button}>Login</button>}
      </div>
    </div>
  )
}

export default Navbar;