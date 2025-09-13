import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Progress } from './ui/progress'
import { 
  Building2, 
  Users, 
  Calendar, 
  MapPin, 
  Star, 
  DollarSign,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Eye,
  Bell,
  Settings,
  LogOut,
  Download,
  Filter,
  Search,
  Mail,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface Analytics {
  activeFairs: number
  totalExhibitors: number
  pendingExhibitors: number
  totalVisitors: number
  totalRevenue: number
  totalFeedback: number
  averageRating: number
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

interface Exhibitor {
  userId: string
  company: string
  status: 'pending' | 'approved' | 'rejected'
  products: any[]
  stalls: string[]
  payments: any[]
}

export const AdminDashboard: React.FC = () => {
  const { user, signOut, session } = useAuth()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [fairs, setFairs] = useState<Fair[]>([])
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.access_token) {
      loadDashboardData()
    }
  }, [session])

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

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load analytics
      const analyticsData = await apiCall('/analytics/overview')
      setAnalytics(analyticsData.analytics)
      
      // Load fairs
      const fairsData = await apiCall('/fairs')
      setFairs(fairsData.fairs)
      
      // Load exhibitors
      const exhibitorsData = await apiCall('/exhibitors')
      setExhibitors(exhibitorsData.exhibitors)
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const approveExhibitor = async (exhibitorId: string) => {
    try {
      await apiCall(`/exhibitor/${exhibitorId}/approve`, { method: 'PUT' })
      toast.success('Exhibitor approved successfully')
      loadDashboardData() // Refresh data
    } catch (error) {
      console.error('Failed to approve exhibitor:', error)
      toast.error('Failed to approve exhibitor')
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const pendingExhibitors = exhibitors.filter(ex => ex.status === 'pending')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">ITFC Trade Fair</h1>
              <Badge variant="default">Administrator</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage trade fairs, exhibitors, and track performance</p>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Fairs</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.activeFairs}</div>
                <p className="text-xs text-muted-foreground">
                  Current active events
                </p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Exhibitors</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalExhibitors}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.pendingExhibitors} pending approval
                </p>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">+12%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalVisitors}</div>
                <p className="text-xs text-muted-foreground">
                  For upcoming events
                </p>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">+24%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  From stall bookings
                </p>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">+18%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fairs">Fair Management</TabsTrigger>
            <TabsTrigger value="exhibitors">Exhibitors</TabsTrigger>
            <TabsTrigger value="halls">Halls & Stalls</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest updates and actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">System initialized with demo data</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Plus className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Trade fair platform activated</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Exhibitors waiting for approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingExhibitors.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No pending approvals</p>
                    ) : (
                      pendingExhibitors.map((exhibitor) => (
                        <div key={exhibitor.userId} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{exhibitor.company}</p>
                            <p className="text-xs text-gray-500">Pending approval</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" onClick={() => approveExhibitor(exhibitor.userId)}>
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Platform Status</p>
                      <p className="text-3xl font-bold">Active</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Avg Rating</p>
                      <p className="text-3xl font-bold">{analytics?.averageRating.toFixed(1) || '0.0'}</p>
                    </div>
                    <Star className="h-12 w-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">System Health</p>
                      <p className="text-3xl font-bold">100%</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Fair Management Tab */}
          <TabsContent value="fairs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Trade Fair Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Fair
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Trade Fairs</CardTitle>
                <CardDescription>Manage and monitor all trade fair events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search fairs..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {fairs.map((fair) => (
                      <Card key={fair.id} className={`border-l-4 ${
                        fair.status === 'active' ? 'border-l-green-500' : 
                        fair.status === 'upcoming' ? 'border-l-blue-500' : 'border-l-gray-500'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold">{fair.name}</h3>
                                <Badge variant={fair.status === 'active' ? 'default' : 'secondary'}>
                                  {fair.status}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 mb-3">
                                <MapPin className="h-4 w-4 mr-1" />
                                {fair.location} • {new Date(fair.startDate).toLocaleDateString()} - {new Date(fair.endDate).toLocaleDateString()}
                              </div>
                              <p className="text-sm text-gray-600 mb-4">
                                {fair.description}
                              </p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Exhibitors:</span>
                                  <span className="font-medium ml-1">{fair.exhibitors.length}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Revenue:</span>
                                  <span className="font-medium ml-1">${fair.revenue.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Visitors:</span>
                                  <span className="font-medium ml-1">{fair.visitors.length}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exhibitors Tab */}
          <TabsContent value="exhibitors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Exhibitor Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Notifications
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Exhibitor Applications</CardTitle>
                <CardDescription>Review and manage exhibitor registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stalls</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exhibitors.map((exhibitor) => (
                      <TableRow key={exhibitor.userId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{exhibitor.company}</div>
                            <div className="text-sm text-gray-500">ID: {exhibitor.userId.substring(0, 8)}...</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            exhibitor.status === 'approved' ? 'default' : 
                            exhibitor.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {exhibitor.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {exhibitor.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {exhibitor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{exhibitor.stalls.length}</span> allocated
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {exhibitor.status === 'pending' ? (
                              <Button size="sm" onClick={() => approveExhibitor(exhibitor.userId)}>
                                Approve
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">View</Button>
                            )}
                            <Button variant="outline" size="sm">Contact</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Halls & Stalls Tab */}
          <TabsContent value="halls" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Halls & Stalls Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Hall
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Hall Overview</CardTitle>
                <CardDescription>Manage exhibition halls and stall allocations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Hall management interface will be available here</p>
                  <p className="text-sm text-gray-500 mt-2">Configure halls, stalls, and layout management</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Analytics & Reports</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for trade fair operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Detailed analytics dashboard coming soon</p>
                    <p className="text-sm text-gray-500 mt-2">Charts, trends, and detailed reports</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}