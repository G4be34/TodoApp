import React from "react"
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: 'Todo App Contact',
  description: 'This is the Contact Page',
}

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lets Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src="/contact.png" alt="Contact Photo" fill={true} className={styles.image} />
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="Name" className={styles.input} />
          <input type="text" placeholder="Email" className={styles.input} />
          <textarea className={styles.textArea} placeholder="Message" cols="30" rows={10}></textarea>
          <Link href="#">
            <button className={styles.button}>Send</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Contact;