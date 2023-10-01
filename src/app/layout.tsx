import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { ThemeProvider } from '../context/ThemeContext'
import AuthProvider from '../components/AuthProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App Homepage',
  description: 'The homepage of the Todo App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className='container'>
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
