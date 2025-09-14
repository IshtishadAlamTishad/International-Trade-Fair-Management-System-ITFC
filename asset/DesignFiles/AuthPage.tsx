// used for designing the HTML,CSS,JS converstion of Frontend React TSX files

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Building2, 
  Users, 
  Calendar, 
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner@2.0.3'

interface AuthPageProps {
  onAuthSuccess: () => void
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    company: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { signIn, signUp, loading } = useAuth()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (authTab === 'signup') {
      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.role) newErrors.role = 'Please select a role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    const result = await signIn(formData.email, formData.password)
    
    if (result.success) {
      toast.success('Successfully signed in!')
      onAuthSuccess()
    } else {
      toast.error(result.error || 'Sign in failed')
    }
  }

  const handleSignup = async () => {
    if (!validateForm()) return

    const result = await signUp({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      company: formData.company
    })
    
    if (result.success) {
      toast.success('Account created successfully! Please sign in.')
      setAuthTab('login')
      setFormData(prev => ({ ...prev, firstName: '', lastName: '', role: '', company: '' }))
    } else {
      toast.error(result.error || 'Sign up failed')
    }
  }

  const setDemoCredentials = (role: 'admin' | 'exhibitor' | 'visitor') => {
    const credentials = {
      admin: { email: 'admin@itfc.com', password: 'admin123' },
      exhibitor: { email: 'exhibitor@company.com', password: 'expo123' },
      visitor: { email: 'visitor@email.com', password: 'visit123' }
    }
    
    setFormData(prev => ({
      ...prev,
      email: credentials[role].email,
      password: credentials[role].password
    }))
    setAuthTab('login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-10 w-10 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ITFC Trade Fair</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button>
              <Button variant="outline">Help</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to ITFC Trade Fair Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive platform for managing international trade fairs, connecting exhibitors with visitors, 
              and streamlining event operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div className="grid gap-6">
                <Card className="p-6 border-l-4 border-l-blue-500">
                  <div className="flex items-start space-x-4">
                    <Users className="h-8 w-8 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">ITFC Staff Dashboard</h3>
                      <p className="text-gray-600">Complete control over trade fair operations, exhibitor management, and analytics</p>
                      <ul className="mt-3 space-y-1 text-sm text-gray-500">
                        <li>• Fair & Hall Management</li>
                        <li>• Exhibitor Approval Process</li>
                        <li>• Revenue & Analytics Tracking</li>
                        <li>• Visitor Management</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-green-500">
                  <div className="flex items-start space-x-4">
                    <Building2 className="h-8 w-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Exhibitor Portal</h3>
                      <p className="text-gray-600">Comprehensive tools for exhibitors to manage their trade fair presence</p>
                      <ul className="mt-3 space-y-1 text-sm text-gray-500">
                        <li>• Product Catalog Management</li>
                        <li>• Stall Booking & Payments</li>
                        <li>• Sales Performance Tracking</li>
                        <li>• Lead Generation Tools</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-purple-500">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-8 w-8 text-purple-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Visitor Experience</h3>
                      <p className="text-gray-600">Seamless registration and engagement platform for trade fair attendees</p>
                      <ul className="mt-3 space-y-1 text-sm text-gray-500">
                        <li>• Easy Registration Process</li>
                        <li>• Digital Ticket Management</li>
                        <li>• Exhibitor Discovery</li>
                        <li>• Feedback & Rating System</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <Card className="max-w-md mx-auto w-full shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {authTab === 'login' ? 'Sign In to Your Account' : 'Create New Account'}
                </CardTitle>
                <CardDescription>
                  {authTab === 'login' 
                    ? 'Access your trade fair dashboard' 
                    : 'Join the trade fair platform'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as 'login' | 'signup')}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Remember me</span>
                      </label>
                      <Button variant="link" className="text-sm">Forgot password?</Button>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <div className="bg-blue-50 p-4 rounded-lg mt-6">
                      <p className="text-sm font-medium text-blue-800 mb-2">Try Demo Accounts:</p>
                      <div className="space-y-2">
                        <button 
                          onClick={() => setDemoCredentials('admin')}
                          className="w-full text-left text-xs text-blue-700 hover:text-blue-900 bg-white p-2 rounded border"
                        >
                          <span className="font-medium">Admin:</span> admin@itfc.com / admin123
                        </button>
                        <button 
                          onClick={() => setDemoCredentials('exhibitor')}
                          className="w-full text-left text-xs text-blue-700 hover:text-blue-900 bg-white p-2 rounded border"
                        >
                          <span className="font-medium">Exhibitor:</span> exhibitor@company.com / expo123
                        </button>
                        <button 
                          onClick={() => setDemoCredentials('visitor')}
                          className="w-full text-left text-xs text-blue-700 hover:text-blue-900 bg-white p-2 rounded border"
                        >
                          <span className="font-medium">Visitor:</span> visitor@email.com / visit123
                        </button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Smith" 
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@company.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Create a secure password" 
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Account Type</Label>
                      <Select onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">ITFC Staff (Administrator)</SelectItem>
                          <SelectItem value="exhibitor">Exhibitor</SelectItem>
                          <SelectItem value="visitor">Visitor</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && (
                        <p className="text-sm text-red-600">{errors.role}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name (Optional)</Label>
                      <Input 
                        id="company" 
                        placeholder="Your company name" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleSignup}
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}