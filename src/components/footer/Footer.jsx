import React from "react"
import styles from "./footer.module.css"
import Image from "next/image"

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 Gab. All rights reserved</div>
      <div className={styles.icons}>
        <Image src={"/1.png"} alt="Gab FB" width={15} height={15} className={styles.icon} />
        <Image src={"/2.png"} alt="Gab IG" width={15} height={15} className={styles.icon} />
        <Image src={"/3.png"} alt="Gab Twitter" width={15} height={15} className={styles.icon} />
        <Image src={"/4.png"} alt="Gab YT" width={15} height={15} className={styles.icon} />
      </div>
    </div>
  )
}

export default Footer;