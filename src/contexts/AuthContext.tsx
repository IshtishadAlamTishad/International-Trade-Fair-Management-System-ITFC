import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id?: string
  username: string
  role: 'admin' | 'exhibitor' | 'visitor'
  firstName?: string
  lastName?: string
  company?: string
  email?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (data: { username: string; password: string; role: string }) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check session on mount
    const checkSession = async () => {
      try {
        const res = await fetch('/backend/check-session')
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setUser(data.user)
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
      setLoading(false)
    }
    checkSession()
  }, [])

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch('/backend/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (data.success) {
        setUser({
          username,
          role: data.role,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email
        })
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const signUp = async (data: { username: string; password: string; role: string; firstName?: string; lastName?: string; company?: string; email?: string }) => {
    try {
      const response = await fetch('/backend/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.success) {
        return { success: true }
      } else {
        return { success: false, error: res.error || 'Signup failed' }
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Signup failed' }
    }
  }

  const signOut = async () => {
    await fetch('/backend/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
// (Removed unreachable/duplicate code)