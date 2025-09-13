import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createClient } from '@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// CORS and logging middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Helper function to verify user authentication
async function verifyUser(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'Missing or invalid authorization header' }
  }
  const token = authHeader.split(' ')[1]
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return { user: null, error: 'Invalid or expired token' }
  }
  return { user, error: null }
}

// Auth routes
app.post('/make-server-40eaaba9/auth/signup', async (c) => {
  try {
    const { email, password, firstName, lastName, role, company } = await c.req.json()
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        first_name: firstName,
        last_name: lastName,
        role: role || 'visitor',
        company: company || null
      },
      email_confirm: true // Auto-confirm since email server isn't configured
    })
    
    if (error) {
      console.log('Signup error:', error)
      return c.json({ error: error.message }, 400)
    }
    
    // Store additional user data in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      firstName,
      lastName,
      role: role || 'visitor',
      company: company || null,
      registrationStatus: role === 'exhibitor' ? 'pending' : 'approved',
      createdAt: new Date().toISOString()
    })
    
    // Create user-specific data based on role
    if (role === 'exhibitor') {
      await kv.set(`exhibitor:${data.user.id}`, {
        userId: data.user.id,
        company: company || '',
        products: [],
        stalls: [],
        payments: [],
        status: 'pending'
      })
    } else if (role === 'visitor') {
      await kv.set(`visitor:${data.user.id}`, {
        userId: data.user.id,
        tickets: [],
        feedback: [],
        interests: []
      })
    }
    
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log('Signup error:', error)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

app.post('/make-server-40eaaba9/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.log('Signin error:', error)
      return c.json({ error: error.message }, 400)
    }
    
    // Get user profile from KV store
    const userProfile = await kv.get(`user:${data.user.id}`)
    
    return c.json({ 
      success: true, 
      user: data.user,
      session: data.session,
      profile: userProfile
    })
  } catch (error) {
    console.log('Signin error:', error)
    return c.json({ error: 'Internal server error during signin' }, 500)
  }
})

// User profile routes
app.get('/make-server-40eaaba9/user/profile', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  const profile = await kv.get(`user:${user.id}`)
  return c.json({ profile })
})

app.put('/make-server-40eaaba9/user/profile', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  try {
    const updates = await c.req.json()
    const currentProfile = await kv.get(`user:${user.id}`) || {}
    const updatedProfile = { ...currentProfile, ...updates }
    await kv.set(`user:${user.id}`, updatedProfile)
    return c.json({ success: true, profile: updatedProfile })
  } catch (error) {
    console.log('Profile update error:', error)
    return c.json({ error: 'Failed to update profile' }, 500)
  }
})

// Trade Fair Management routes
app.get('/make-server-40eaaba9/fairs', async (c) => {
  try {
    const fairs = await kv.getByPrefix('fair:') || []
    return c.json({ fairs })
  } catch (error) {
    console.log('Get fairs error:', error)
    return c.json({ error: 'Failed to fetch fairs' }, 500)
  }
})

app.post('/make-server-40eaaba9/fairs', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  // Check if user is admin
  const userProfile = await kv.get(`user:${user.id}`)
  if (userProfile?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403)
  }
  try {
    const fairData = await c.req.json()
    const fairId = `fair_${Date.now()}`
    const newFair = {
      id: fairId,
      ...fairData,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      exhibitors: [],
      visitors: [],
      revenue: 0
    }
    await kv.set(`fair:${fairId}`, newFair)
    return c.json({ success: true, fair: newFair })
  } catch (error) {
    console.log('Create fair error:', error)
    return c.json({ error: 'Failed to create fair' }, 500)
  }
})

// Exhibitor Management routes
app.get('/make-server-40eaaba9/exhibitors', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error) return c.json({ error }, 401)
  
  try {
    const exhibitors = await kv.getByPrefix('exhibitor:') || []
    return c.json({ exhibitors })
  } catch (error) {
    console.log('Get exhibitors error:', error)
    return c.json({ error: 'Failed to fetch exhibitors' }, 500)
  }
})

app.get('/make-server-40eaaba9/exhibitor/:id', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error) return c.json({ error }, 401)
  
  const exhibitorId = c.req.param('id')
  const exhibitor = await kv.get(`exhibitor:${exhibitorId}`)
  
  return c.json({ exhibitor })
})

app.put('/make-server-40eaaba9/exhibitor/:id/approve', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  // Check if user is admin
  const userProfile = await kv.get(`user:${user.id}`)
  if (userProfile?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403)
  }
  const exhibitorId = c.req.param('id')
  const exhibitor = await kv.get(`exhibitor:${exhibitorId}`)
  if (exhibitor) {
    exhibitor.status = 'approved'
    await kv.set(`exhibitor:${exhibitorId}`, exhibitor)
    // Update user profile
    const userProfile = await kv.get(`user:${exhibitorId}`)
    if (userProfile) {
      userProfile.registrationStatus = 'approved'
      await kv.set(`user:${exhibitorId}`, userProfile)
    }
  }
  return c.json({ success: true, exhibitor })
})

// Product Management routes
app.get('/make-server-40eaaba9/exhibitor/:id/products', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  const exhibitorId = c.req.param('id')
  const products = await kv.getByPrefix(`product:${exhibitorId}:`) || []
  return c.json({ products })
})

app.post('/make-server-40eaaba9/exhibitor/:id/products', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  const exhibitorId = c.req.param('id')
  // Check if user owns this exhibitor profile or is admin
  const userProfile = await kv.get(`user:${user.id}`)
  if (user.id !== exhibitorId && userProfile?.role !== 'admin') {
    return c.json({ error: 'Access denied' }, 403)
  }
  try {
    const productData = await c.req.json()
    const productId = `product_${Date.now()}`
    const newProduct = {
      id: productId,
      exhibitorId,
      ...productData,
      createdAt: new Date().toISOString()
    }
    await kv.set(`product:${exhibitorId}:${productId}`, newProduct)
    return c.json({ success: true, product: newProduct })
  } catch (error) {
    console.log('Create product error:', error)
    return c.json({ error: 'Failed to create product' }, 500)
  }
})

// Visitor Management routes
app.get('/make-server-40eaaba9/visitors', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error) return c.json({ error }, 401)
  
  try {
    const visitors = await kv.getByPrefix('visitor:') || []
    return c.json({ visitors })
  } catch (error) {
    console.log('Get visitors error:', error)
    return c.json({ error: 'Failed to fetch visitors' }, 500)
  }
})

// Feedback routes
app.post('/make-server-40eaaba9/feedback', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  try {
    const feedbackData = await c.req.json()
    const feedbackId = `feedback_${Date.now()}`
    const newFeedback = {
      id: feedbackId,
      userId: user.id,
      ...feedbackData,
      createdAt: new Date().toISOString()
    }
    await kv.set(`feedback:${feedbackId}`, newFeedback)
    // Add to visitor's feedback list
    const visitor = await kv.get(`visitor:${user.id}`) || { feedback: [] }
    visitor.feedback = visitor.feedback || []
    visitor.feedback.push(feedbackId)
    await kv.set(`visitor:${user.id}`, visitor)
    return c.json({ success: true, feedback: newFeedback })
  } catch (error) {
    console.log('Create feedback error:', error)
    return c.json({ error: 'Failed to submit feedback' }, 500)
  }
})

// Analytics routes
app.get('/make-server-40eaaba9/analytics/overview', async (c) => {
  const { user, error } = await verifyUser(c.req.header('Authorization') ?? null)
  if (error || !user) return c.json({ error: error || 'User not found' }, 401)
  // Check if user is admin
  const userProfile = await kv.get(`user:${user.id}`)
  if (userProfile?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403)
  }
  try {
    const fairs = await kv.getByPrefix('fair:') || []
    const exhibitors = await kv.getByPrefix('exhibitor:') || []
    const visitors = await kv.getByPrefix('visitor:') || []
    const feedback = await kv.getByPrefix('feedback:') || []
    const activeFairs = fairs.filter(fair => fair.status === 'active').length
    const pendingExhibitors = exhibitors.filter(ex => ex.status === 'pending').length
    const totalRevenue = fairs.reduce((sum, fair) => sum + (fair.revenue || 0), 0)
    const analytics = {
      activeFairs,
      totalExhibitors: exhibitors.length,
      pendingExhibitors,
      totalVisitors: visitors.length,
      totalRevenue,
      totalFeedback: feedback.length,
      averageRating: feedback.length > 0 
        ? feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.length 
        : 0
    }
    return c.json({ analytics })
  } catch (error) {
    console.log('Analytics error:', error)
    return c.json({ error: 'Failed to fetch analytics' }, 500)
  }
})

// Initialize demo data
app.post('/make-server-40eaaba9/init-demo', async (c) => {
  try {
    // Create demo admin user
    const { data: adminUser } = await supabase.auth.admin.createUser({
      email: 'admin@itfc.com',
      password: 'admin123',
      user_metadata: { 
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin'
      },
      email_confirm: true
    })
    
    if (adminUser.user) {
      await kv.set(`user:${adminUser.user.id}`, {
        id: adminUser.user.id,
        email: 'admin@itfc.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        registrationStatus: 'approved',
        createdAt: new Date().toISOString()
      })
    }
    
    // Create demo exhibitor user
    const { data: exhibitorUser } = await supabase.auth.admin.createUser({
      email: 'exhibitor@company.com',
      password: 'expo123',
      user_metadata: { 
        first_name: 'John',
        last_name: 'Smith',
        role: 'exhibitor',
        company: 'Tech Solutions Inc'
      },
      email_confirm: true
    })
    
    if (exhibitorUser.user) {
      await kv.set(`user:${exhibitorUser.user.id}`, {
        id: exhibitorUser.user.id,
        email: 'exhibitor@company.com',
        firstName: 'John',
        lastName: 'Smith',
        role: 'exhibitor',
        company: 'Tech Solutions Inc',
        registrationStatus: 'approved',
        createdAt: new Date().toISOString()
      })
      
      await kv.set(`exhibitor:${exhibitorUser.user.id}`, {
        userId: exhibitorUser.user.id,
        company: 'Tech Solutions Inc',
        products: [],
        stalls: ['A12', 'A13', 'A14'],
        payments: [
          { id: 'payment_1', amount: 1500, description: 'Stall A12 - Premium', status: 'completed' },
          { id: 'payment_2', amount: 1200, description: 'Stall A13 - Standard', status: 'completed' },
          { id: 'payment_3', amount: 1200, description: 'Stall A14 - Standard', status: 'completed' }
        ],
        status: 'approved'
      })
    }
    
    // Create demo visitor user
    const { data: visitorUser } = await supabase.auth.admin.createUser({
      email: 'visitor@email.com',
      password: 'visit123',
      user_metadata: { 
        first_name: 'Sarah',
        last_name: 'Johnson',
        role: 'visitor'
      },
      email_confirm: true
    })
    
    if (visitorUser.user) {
      await kv.set(`user:${visitorUser.user.id}`, {
        id: visitorUser.user.id,
        email: 'visitor@email.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'visitor',
        registrationStatus: 'approved',
        createdAt: new Date().toISOString()
      })
      
      await kv.set(`visitor:${visitorUser.user.id}`, {
        userId: visitorUser.user.id,
        tickets: [
          { id: 'VIS-2024-7891', type: 'Premium', fairId: 'fair_1', status: 'active' }
        ],
        feedback: [],
        interests: ['Technology', 'Innovation', 'Sustainable Development', 'Digital Marketing']
      })
    }
    
    // Create demo trade fair
    await kv.set('fair:fair_1', {
      id: 'fair_1',
      name: 'International Tech Expo 2024',
      description: 'The premier technology exhibition featuring the latest innovations in AI, IoT, and digital transformation.',
      location: 'New York Convention Center',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      status: 'active',
      exhibitors: [],
      visitors: [],
      revenue: 234500,
      createdAt: new Date().toISOString()
    })
    
    await kv.set('fair:fair_2', {
      id: 'fair_2',
      name: 'Global Fashion Week',
      description: 'Showcasing the latest trends in fashion, textiles, and lifestyle products from around the world.',
      location: 'Paris Exhibition Center',
      startDate: '2024-04-20',
      endDate: '2024-04-25',
      status: 'upcoming',
      exhibitors: [],
      visitors: [],
      revenue: 67800,
      createdAt: new Date().toISOString()
    })
    
    return c.json({ success: true, message: 'Demo data initialized' })
  } catch (error) {
    console.log('Demo init error:', error)
    return c.json({ error: 'Failed to initialize demo data' }, 500)
  }
})

// Health check
app.get('/make-server-40eaaba9/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Replace with Node.js/Express or other server start logic if not using Deno
// Example for Express:
// const express = require('express');
// const server = express();
// server.use(app.fetch);
// server.listen(process.env.PORT || 3000);