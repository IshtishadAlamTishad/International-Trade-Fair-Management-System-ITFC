import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { 
  Calendar, 
  CheckCircle,
  Ticket,
  MessageSquare,
  User,
  Mail,
  Phone,
  Heart,
  MapPin,
  Star,
  Download,
  Search,
  Send,
  Bell,
  LogOut
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface VisitorData {
  userId: string
  tickets: Ticket[]
  feedback: string[]
  interests: string[]
}

interface TicketData {
  id: string
  type: string
  fairId: string
  status: 'active' | 'expired' | 'upcoming'
}

interface Fair {
  id: string
  name: string
  description: string
  location: string
  startDate: string
  endDate: string
  status: 'active' | 'upcoming' | 'completed'
  exhibitors: string[]
  visitors: string[]
  revenue: number
}

interface Feedback {
  id: string
  fairId: string
  rating: number
  comments: string
  createdAt: string
}

export const VisitorDashboard: React.FC = () => {
  const { user, signOut, session } = useAuth()
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null)
  const [fairs, setFairs] = useState<Fair[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [feedbackForm, setFeedbackForm] = useState({
    fairId: '',
    rating: 0,
    comments: ''
  })

  useEffect(() => {
    if (session?.access_token && user?.id) {
      loadVisitorData()
    }
  }, [session, user])

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40eaaba9${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }
    
    return response.json()
  }

  const loadVisitorData = async () => {
    try {
      setLoading(true)
      
      // Load visitor profile - for demo purposes, create default data if none exists
      const defaultVisitorData = {
        userId: user?.id,
        tickets: [
          { id: 'VIS-2024-7891', type: 'Premium', fairId: 'fair_1', status: 'active' }
        ],
        feedback: [],
        interests: ['Technology', 'Innovation', 'Sustainable Development', 'Digital Marketing']
      }
      setVisitorData(defaultVisitorData)
      
      // Load available fairs
      const fairsResponse = await apiCall('/fairs')
      setFairs(fairsResponse.fairs || [])
      
    } catch (error) {
      console.error('Failed to load visitor data:', error)
      toast.error('Failed to load visitor data')
    } finally {
      setLoading(false)
    }
  }

  const submitFeedback = async () => {
    if (!feedbackForm.fairId || !feedbackForm.rating || !feedbackForm.comments.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      await apiCall('/feedback', {
        method: 'POST',
        body: JSON.stringify({
          fairId: feedbackForm.fairId,
          rating: feedbackForm.rating,
          comments: feedbackForm.comments
        })
      })
      
      toast.success('Feedback submitted successfully!')
      setFeedbackForm({ fairId: '', rating: 0, comments: '' })
      loadVisitorData() // Refresh data
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      toast.error('Failed to submit feedback')
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-900">ITFC Trade Fair</h1>
              <Badge variant="default" className="bg-purple-100 text-purple-800">Visitor</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Welcome, {user?.firstName}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Visitor Dashboard</h1>
          <p className="text-gray-600 mt-2">Explore trade fairs and manage your experience</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <Badge variant="default" className="mt-2">Verified Visitor</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Ticket</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Premium</div>
              <p className="text-xs text-muted-foreground">Full access pass</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
              <p className="text-xs text-muted-foreground">Reviews submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="events">Trade Fairs</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your registration details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                        <p className="mt-1 text-lg">{user?.firstName} {user?.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email Address</Label>
                        <p className="mt-1">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Phone Number</Label>
                        <p className="mt-1">+1-555-0456</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Areas of Interest</Label>
                        <p className="mt-1">{visitorData?.interests.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                        <p className="mt-1">February 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital Tickets</CardTitle>
                <CardDescription>Your trade fair access passes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Premium Access Pass</h3>
                      <p className="text-purple-100">ITFC Official Visitor Ticket</p>
                    </div>
                    <Ticket className="h-10 w-10" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                      <Label className="text-purple-100 text-sm">Visitor Name</Label>
                      <p className="font-semibold text-lg">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div>
                      <Label className="text-purple-100 text-sm">Ticket ID</Label>
                      <p className="font-mono">VIS-2024-7891</p>
                    </div>
                    <div>
                      <Label className="text-purple-100 text-sm">Valid For</Label>
                      <p className="font-semibold">All Current Events</p>
                    </div>
                    <div>
                      <Label className="text-purple-100 text-sm">Access Level</Label>
                      <p className="font-semibold">Premium</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Premium Benefits</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Priority access to all halls</li>
                      <li>• VIP networking events</li>
                      <li>• Complimentary refreshments</li>
                      <li>• Free digital catalog</li>
                      <li>• Product demonstration access</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Event Schedule</h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <div className="flex justify-between">
                        <span>Tech Expo Opening:</span>
                        <span>Mar 15, 9:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fashion Week:</span>
                        <span>Apr 20, 10:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Networking Event:</span>
                        <span>Mar 16, 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Fairs Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Available Trade Fairs</h2>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Browse All
              </Button>
            </div>

            <div className="grid gap-6">
              {fairs.map((fair) => (
                <Card key={fair.id} className={`border-l-4 ${
                  fair.status === 'active' ? 'border-l-blue-500' : 
                  fair.status === 'upcoming' ? 'border-l-purple-500' : 'border-l-gray-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold">{fair.name}</h3>
                          <Badge className={
                            fair.status === 'active' ? 'bg-blue-600' : 
                            fair.status === 'upcoming' ? 'bg-purple-600' : 'bg-gray-600'
                          }>
                            {fair.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          {fair.location} • {new Date(fair.startDate).toLocaleDateString()} - {new Date(fair.endDate).toLocaleDateString()}
                        </div>
                        <p className="text-gray-600 mb-6">
                          {fair.description}
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center bg-gray-50 p-3 rounded-lg">
                            <div className="font-bold text-lg">{fair.exhibitors.length}</div>
                            <div className="text-sm text-gray-600">Exhibitors</div>
                          </div>
                          <div className="text-center bg-gray-50 p-3 rounded-lg">
                            <div className="font-bold text-lg">{fair.visitors.length}+</div>
                            <div className="text-sm text-gray-600">Visitors</div>
                          </div>
                          <div className="text-center bg-gray-50 p-3 rounded-lg">
                            <div className="font-bold text-lg">4.6</div>
                            <div className="text-sm text-gray-600">Avg Rating</div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button>
                            <MapPin className="h-4 w-4 mr-2" />
                            View Floor Plan
                          </Button>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Event Schedule
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Exhibitor List
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Feedback & Reviews</h2>
              <Button onClick={submitFeedback}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit New Feedback
              </Button>
            </div>

            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Help us improve future trade fairs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Trade Fair</Label>
                  <Select onValueChange={(value) => setFeedbackForm(prev => ({ ...prev, fairId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an event to review" />
                    </SelectTrigger>
                    <SelectContent>
                      {fairs.map((fair) => (
                        <SelectItem key={fair.id} value={fair.id}>{fair.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Overall Rating</Label>
                  <div className="flex items-center space-x-2">
                    {renderStars(feedbackForm.rating, true, (rating) => 
                      setFeedbackForm(prev => ({ ...prev, rating }))
                    )}
                    <span className="text-sm text-gray-600">({feedbackForm.rating}/5)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments">Your Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Share your thoughts about the event, organization, exhibitors, etc."
                    rows={4}
                    value={feedbackForm.comments}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, comments: e.target.value }))}
                  />
                </div>
                <Button onClick={submitFeedback}>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Previous Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Your Previous Reviews</CardTitle>
                <CardDescription>Feedback you've submitted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedback.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No feedback submitted yet</p>
                    <p className="text-sm text-gray-500 mt-2">Share your experience with trade fairs</p>
                  </div>
                ) : (
                  feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Trade Fair Review</h4>
                          <div className="flex items-center mt-1">
                            {renderStars(item.rating)}
                            <span className="text-sm text-gray-500 ml-2">({item.rating}/5)</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{item.comments}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}