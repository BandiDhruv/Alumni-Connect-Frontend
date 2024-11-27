import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  type: 'student' | 'alumni'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, type: 'student' | 'alumni') => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // This would normally make an API call
    setUser({ id: '1', email, type: 'student' })
  }

  const signup = async (email: string, password: string, type: 'student' | 'alumni') => {
    // This would normally make an API call
    setUser({ id: '1', email, type })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

