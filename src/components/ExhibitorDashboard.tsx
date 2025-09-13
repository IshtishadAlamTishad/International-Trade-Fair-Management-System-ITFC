import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Separator } from './ui/separator'
import { 
  Building2, 
  Package, 
  MapPin, 
  DollarSign,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Bell,
  LogOut,
  Search,
  Filter,
  CreditCard
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface ExhibitorData {
  userId: string
  company: string
  status: 'pending' | 'approved' | 'rejected'
  products: Product[]
  stalls: string[]
  payments: Payment[]
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  featured: boolean
}

interface Payment {
  id: string
  amount: number
  description: string
  status: 'completed' | 'pending' | 'failed'
  date?: string
}

export const ExhibitorDashboard: React.FC = () => {
  const { user, signOut, session } = useAuth()
  const [exhibitorData, setExhibitorData] = useState<ExhibitorData | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.access_token && user?.id) {
      loadExhibitorData()
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

  const loadExhibitorData = async () => {
    try {
      setLoading(true)
      
      // Load exhibitor profile
      const exhibitorResponse = await apiCall(`/exhibitor/${user?.id}`)
      setExhibitorData(exhibitorResponse.exhibitor)
      
      // Load products
      const productsResponse = await apiCall(`/exhibitor/${user?.id}/products`)
      setProducts(productsResponse.products)
      
    } catch (error) {
      console.error('Failed to load exhibitor data:', error)
      toast.error('Failed to load exhibitor data')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const totalInvestment = exhibitorData?.payments.reduce((sum, payment) => sum + payment.amount, 0) || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">ITFC Trade Fair</h1>
              <Badge variant="default" className="bg-green-100 text-green-800">Exhibitor</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">{exhibitorData?.company || user?.company}</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Exhibitor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your products, stalls, and track performance</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
              <CheckCircle className={`h-4 w-4 ${exhibitorData?.status === 'approved' ? 'text-green-500' : 'text-yellow-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{exhibitorData?.status || 'Loading...'}</div>
              <Badge variant={exhibitorData?.status === 'approved' ? 'default' : 'secondary'} className="mt-2">
                {exhibitorData?.status === 'approved' ? 'Active Exhibitor' : 'Pending Approval'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">In catalog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stalls Allocated</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exhibitorData?.stalls.length || 0}</div>
              <p className="text-xs text-muted-foreground">Exhibition spaces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Stall booking fees</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="stalls">My Stalls</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Company Profile */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Your registered business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Company Name</Label>
                      <p className="mt-1 font-medium">{exhibitorData?.company || user?.company}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Contact Person</Label>
                      <p className="mt-1 font-medium">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="mt-1">{user?.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Status</Label>
                      <p className="mt-1 capitalize">{exhibitorData?.status}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Business Category</Label>
                    <p className="mt-1">Technology Solutions & AI Services</p>
                  </div>
                </CardContent>
              </Card>

              {/* Current Fair Participation */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Participation</CardTitle>
                  <CardDescription>Active trade fair events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-blue-900">International Tech Expo 2024</h3>
                      <Badge className="bg-blue-600">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                      <div>
                        <span className="font-medium">Location:</span> New York
                      </div>
                      <div>
                        <span className="font-medium">Dates:</span> Mar 15-17
                      </div>
                      <div>
                        <span className="font-medium">Hall:</span> Tech Pavilion A
                      </div>
                      <div>
                        <span className="font-medium">Stalls:</span> {exhibitorData?.stalls.join(', ')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Allocated Stalls */}
            {exhibitorData?.stalls && exhibitorData.stalls.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Allocated Stalls</CardTitle>
                  <CardDescription>Your exhibition spaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {exhibitorData.stalls.map((stall, index) => {
                      const isFirst = index === 0
                      const payment = exhibitorData.payments[index]
                      
                      return (
                        <div key={stall} className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="bg-white rounded-full p-2">
                              <MapPin className="h-5 w-5 text-green-600" />
                            </div>
                            <Badge variant={isFirst ? 'default' : 'outline'}>
                              {isFirst ? 'Premium' : 'Standard'}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">Stall #{stall}</h3>
                          <p className="text-sm text-gray-600">Hall A - {isFirst ? 'Corner Position' : 'Center Row'}</p>
                          <div className="mt-3 text-sm">
                            <div className="flex justify-between">
                              <span>Size:</span>
                              <span className="font-medium">3m × 3m</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cost:</span>
                              <span className="font-medium">${payment?.amount.toLocaleString() || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Product Catalog</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Showcase Products</CardTitle>
                <CardDescription>Manage products for exhibition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search products..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                      <CardContent className="flex flex-col items-center justify-center h-48 text-center">
                        <Plus className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600">Add New Product</p>
                        <Button variant="ghost" className="mt-2">Click to add</Button>
                      </CardContent>
                    </Card>

                    {/* Demo products */}
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">AI Vision Camera</h3>
                            <Badge variant="default">Featured</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Advanced AI-powered surveillance camera with real-time analysis
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">$599.99</span>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-32 bg-gradient-to-br from-green-400 to-green-600"></div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">IoT Gateway Hub</h3>
                            <Badge variant="outline">New</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Smart gateway for connecting industrial IoT devices
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">$299.99</span>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stalls Tab */}
          <TabsContent value="stalls" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Stalls</h2>
              <Button variant="outline">Request Additional Stall</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Stall Management</CardTitle>
                <CardDescription>Manage your exhibition spaces and layout</CardDescription>
              </CardHeader>
              <CardContent>
                {exhibitorData?.stalls && exhibitorData.stalls.length > 0 ? (
                  <div className="grid gap-4">
                    {exhibitorData.stalls.map((stall, index) => {
                      const payment = exhibitorData.payments[index]
                      return (
                        <Card key={stall} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">Stall #{stall}</h3>
                              <p className="text-gray-600">Hall A - Premium location</p>
                              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Size:</span>
                                  <span className="font-medium ml-2">3m × 3m</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Cost:</span>
                                  <span className="font-medium ml-2">${payment?.amount.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Status:</span>
                                  <Badge variant="default" className="ml-2">Confirmed</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View Layout</Button>
                              <Button variant="outline" size="sm">Edit Setup</Button>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No stalls allocated yet</p>
                    <p className="text-sm text-gray-500 mt-2">Contact administration for stall allocation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Payment Management</h2>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                  <CardDescription>Your booking and payment overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-blue-900">Total Investment</h3>
                      <span className="text-2xl font-bold text-blue-900">${totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2 text-sm text-blue-800">
                      {exhibitorData?.payments.map((payment) => (
                        <div key={payment.id} className="flex justify-between">
                          <span>{payment.description}:</span>
                          <span>${payment.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-600">Paid</p>
                      <p className="text-xl font-bold text-green-700">${totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-xl font-bold text-gray-700">$0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Saved Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4532</p>
                          <p className="text-sm text-gray-500">Expires 12/2026</p>
                        </div>
                      </div>
                      <Badge variant="default">Primary</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track all your transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exhibitorData?.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono">{payment.id}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>${payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="default">Completed</Badge>
                        </TableCell>
                        <TableCell>{payment.date || 'Mar 1, 2024'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Performance Analytics</h2>
              <Button variant="outline">Export Report</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Exhibition Performance</CardTitle>
                <CardDescription>Track your booth performance and visitor engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance analytics coming soon</p>
                  <p className="text-sm text-gray-500 mt-2">Visitor engagement, lead generation, and sales metrics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}