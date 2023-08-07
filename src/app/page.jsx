import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export const metadata = {
  title: 'Todo App Home',
  description: 'This is the Home Page',
}

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeMain}>
        <div className={styles.welcomeContainer}>
          <h1 className={styles.welcomeTitle}>Welcome to Todo App</h1>
          <p className={styles.desc}>Built with:</p>
        </div>
        <div className={styles.imgMain}>
          <div className={styles.imgContainer}>
            <Image src="/next-js-logo.png" fill={true} alt='Next.js Logo' className={styles.img} />
          </div>
          <div className={styles.imgContainer}>
            <Image src="/React_logo.png" fill={true} alt='React Logo' className={styles.img} />
          </div>
          <div className={styles.imgContainer}>
            <Image src="/postgresql_logo.png" fill={true} alt='PostgreSQL Logo' className={styles.img} />
          </div>
          <div className={styles.imgContainer}>
            <Image src="/next-auth.png" fill={true} alt='Next-Auth Logo' className={styles.img} />
          </div>
        </div>
      </div>
      <div className={styles.linksMain}>
        <div className={styles.linkContainer}>
          <Link href="/todo" className={styles.link}>
            <h1 className={styles.linkTitle}>Todos</h1>
          </Link>
          <p className={styles.desc}>See the full list of all your todo items!</p>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/about" className={styles.link}>
            <h1 className={styles.linkTitle}>About</h1>
          </Link>
          <p className={styles.desc}>Check out what this website is all about!</p>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/contact" className={styles.link}>
            <h1 className={styles.linkTitle}>Contact</h1>
          </Link>
          <p className={styles.desc}>Questions or concerns? Get in touch with me!</p>
        </div>
      </div>
    </div>
  )
}
