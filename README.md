
# International Trade Fair Management System (ITFC)

A comprehensive platform for managing international trade fairs, with role-based dashboards for administrators, exhibitors, and visitors.

## Features
- Role-based authentication (Admin, Exhibitor, Visitor)
- Admin dashboard for event and user management
- Exhibitor portal for product and stall management
- Visitor experience with ticketing and feedback

## Getting Started

### 1. Clone the Repository

```powershell
git clone <repository-url>
cd "International Trade Fair Management System ITFC"
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

You can get these values from your Supabase project dashboard.

### 4. Run the Development Server

```powershell
npm run dev
```

The app will be available at the URL shown in the terminal (usually http://localhost:5173).

### 5. Demo Accounts

You can log in using these demo credentials:

| Role      | Email                   | Password  |
|-----------|-------------------------|-----------|
| Admin     | admin@itfc.com          | admin123  |
| Exhibitor | exhibitor@company.com   | expo123   |
| Visitor   | visitor@email.com       | visit123  |

Each account will see a different dashboard based on their role.

---

For more details, see the original Figma design: https://www.figma.com/design/d1i0tvz8OiMlcF9VRbez8K/Trade-Fair-Management-System
  