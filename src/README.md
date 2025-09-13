# ITFC Trade Fair Management System

A comprehensive trade fair management platform with role-based dashboards for administrators, exhibitors, and visitors.

## Features

### 🔐 Authentication & Role-Based Access
- **Admin (ITFC Staff)**: Complete control over trade fair operations
- **Exhibitors**: Product and stall management
- **Visitors**: Event discovery and feedback

### 📊 Admin Dashboard
- Analytics overview with real-time metrics
- Trade fair creation and management
- Exhibitor approval workflow
- Hall and stall allocation
- Revenue tracking and reporting

### 🏢 Exhibitor Portal
- Company profile management
- Product catalog with image support
- Stall booking and payment tracking
- Performance analytics
- Document management

### 🎫 Visitor Experience
- Digital ticket management
- Event discovery and registration
- Feedback and rating system
- Personal profile customization
- Premium access benefits

## Demo Accounts

The application comes with pre-configured demo accounts for testing:

| Role | Email | Password | Access Level |
|------|--------|----------|--------------|
| **Admin** | admin@itfc.com | admin123 | Full system administration |
| **Exhibitor** | exhibitor@company.com | expo123 | Tech Solutions Inc company |
| **Visitor** | visitor@email.com | visit123 | Premium ticket holder |

## Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Backend**: Supabase Edge Functions with Hono.js
- **Database**: Supabase PostgreSQL with KV store
- **Authentication**: Supabase Auth with role-based access
- **State Management**: React Context API

## Quick Start

1. **Access the Application**
   - The app automatically initializes with demo data
   - Use any of the demo accounts above to sign in
   - Each role provides a different dashboard experience

2. **Admin Functions**
   - View analytics and system overview
   - Manage trade fairs and exhibitions
   - Approve exhibitor applications
   - Track revenue and performance

3. **Exhibitor Functions**
   - Set up company profile
   - Add products to catalog
   - Manage stall allocations
   - Process payments and track expenses

4. **Visitor Functions**
   - Explore available trade fairs
   - Manage digital tickets
   - Submit feedback and ratings
   - Update personal preferences

## API Architecture

The system uses a three-tier architecture:

```
Frontend (React) → Server (Hono.js) → Database (Supabase)
```

### Key API Endpoints

- `/auth/signup` - User registration
- `/auth/signin` - User authentication
- `/fairs` - Trade fair management
- `/exhibitors` - Exhibitor operations
- `/feedback` - Visitor feedback system
- `/analytics/overview` - Admin analytics

## Database Schema

The application uses a flexible KV store approach:

- **Users**: `user:{userId}` - User profiles and roles
- **Exhibitors**: `exhibitor:{userId}` - Company and product data
- **Visitors**: `visitor:{userId}` - Tickets and preferences
- **Fairs**: `fair:{fairId}` - Event information and management
- **Products**: `product:{exhibitorId}:{productId}` - Product catalog
- **Feedback**: `feedback:{feedbackId}` - Visitor reviews

## Security Features

- JWT-based authentication with Supabase
- Role-based access control (RBAC)
- API endpoint protection with middleware
- Input validation and sanitization
- Secure payment processing integration

## Development Features

- **Type Safety**: Full TypeScript implementation
- **Component Library**: Consistent UI with shadcn/ui
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error management
- **Loading States**: Smooth user experience
- **Toast Notifications**: Real-time feedback

## Use Cases

### Trade Fair Organizers
- Create and manage multiple events
- Track exhibitor registrations and payments
- Generate analytics and reports
- Manage visitor engagement

### Exhibiting Companies
- Showcase products and services
- Manage booth allocations
- Track lead generation
- Process payments and invoicing

### Trade Fair Visitors
- Discover relevant exhibitions
- Plan event attendance
- Provide feedback and reviews
- Access premium features

## Scalability

The application is designed to handle:
- Multiple concurrent trade fairs
- Thousands of exhibitors per event
- Tens of thousands of visitors
- Real-time data synchronization
- High-availability deployment

## Future Enhancements

- Mobile applications (iOS/Android)
- Advanced analytics with machine learning
- Live chat and messaging features
- Video conferencing integration
- Multi-language support
- Advanced payment processing
- QR code scanning for check-ins
- Social media integration

## Support

For technical support or feature requests, please contact the development team or refer to the system documentation.

---

*Built with modern web technologies for optimal performance and user experience.*