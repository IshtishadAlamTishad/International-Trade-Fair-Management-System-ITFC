import React, { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AuthPage } from './components/AuthPage'
import { AdminDashboard } from './components/AdminDashboard'
import { ExhibitorDashboard } from './components/ExhibitorDashboard'
import { VisitorDashboard } from './components/VisitorDashboard'
import { Toaster } from './components/ui/sonner'
import { Button } from './components/ui/button'
import { projectId, publicAnonKey } from './utils/supabase/info'

const AppContent: React.FC = () => {
  const { user, loading } = useAuth()
  const [initializingDemo, setInitializingDemo] = useState(false)
  const [demoInitialized, setDemoInitialized] = useState(false)

  useEffect(() => {
    // Initialize demo data when app loads
    const initializeDemoData = async () => {
      if (demoInitialized) return
      
      try {
        setInitializingDemo(true)
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40eaaba9/init-demo`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          setDemoInitialized(true)
          console.log('Demo data initialized successfully')
        }
      } catch (error) {
        console.error('Failed to initialize demo data:', error)
      } finally {
        setInitializingDemo(false)
      }
    }

    initializeDemoData()
  }, [demoInitialized])

  // Show loading screen while checking authentication
  if (loading || initializingDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {initializingDemo ? 'Initializing demo data...' : 'Loading application...'}
          </p>
        </div>
      </div>
    )
  }

  // Show auth page if user is not authenticated
  if (!user) {
    return <AuthPage onAuthSuccess={() => window.location.reload()} />
  }

  // Show appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />
      case 'exhibitor':
        return <ExhibitorDashboard />
      case 'visitor':
        return <VisitorDashboard />
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid User Role</h2>
              <p className="text-gray-600 mb-6">Your account role is not recognized.</p>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      {renderDashboard()}
      <Toaster />
    </>
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App