// // used for designing the HTML,CSS,JS converstion of Frontend React TSX files
// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import { Label } from './ui/label'
// import { Alert, AlertDescription } from './ui/alert'
// import { Eye, EyeOff } from 'lucide-react'

// interface LoginFormProps {
//   onLogin: (email: string, password: string) => Promise<void>
// }

// export function LoginForm({ onLogin }: LoginFormProps) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       await onLogin(formData.email, formData.password)
//     } catch (err: any) {
//       setError(err.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="phone">Phone Number</Label>
//         <Input
//           id="phone"
//           name="phone"
//           type="text"
//           required
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Enter your phone number"
//         />
//       </div>

//       <Button type="submit" className="w-full" disabled={loading}>
//         {loading ? 'Signing In...' : 'Sign In'}
//       </Button>

//       <div className="text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
//         <p className="font-medium text-blue-800 mb-2">Try Demo Accounts:</p>
//         <div className="space-y-1 text-xs">
//           <p><strong>Admin:</strong> admin@itfc.com / admin123</p>
//           <p><strong>Exhibitor:</strong> exhibitor@company.com / expo123</p>
//           <p><strong>Visitor:</strong> visitor@email.com / visit123</p>
//         </div>
//         <p className="text-xs text-blue-600 mt-2">These accounts are pre-loaded with sample data</p>
//       </div>
//     </form>
//   )
// }