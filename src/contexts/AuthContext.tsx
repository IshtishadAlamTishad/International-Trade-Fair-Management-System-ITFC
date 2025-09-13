import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'exhibitor' | 'visitor'
  company?: string
  registrationStatus: 'pending' | 'approved' | 'rejected'
}

interface AuthContextType {
  user: User | null
  session: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    company?: string
  }) => Promise<{ success: boolean; error?: string }>
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

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (session && !error) {
          setSession(session)
          // Fetch user profile from backend
          await fetchUserProfile(session.access_token)
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      if (session) {
        await fetchUserProfile(session.access_token)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40eaaba9/user/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.profile)
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40eaaba9/auth/signin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      
      if (data.success) {
        setSession(data.session)
        setUser(data.profile)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: 'Network error during sign in' }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    company?: string
  }) => {
    try {
      setLoading(true)
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40eaaba9/auth/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()
      
      if (data.success) {
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error: 'Network error during sign up' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}