import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">Alumni Connect</Link>
          <nav>
            <ul className="flex space-x-4">
              {['Home', 'Profile', 'Jobs', 'Alumni'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className={`hover:text-primary transition-colors ${
                      location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) 
                        ? 'text-primary font-semibold' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
