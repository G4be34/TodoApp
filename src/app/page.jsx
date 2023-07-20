import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Todo App Home',
  description: 'This is the Home Page',
}

export default function Home() {
  return (
    <div className={styles.container}>
      Home page
    </div>
  )
}
