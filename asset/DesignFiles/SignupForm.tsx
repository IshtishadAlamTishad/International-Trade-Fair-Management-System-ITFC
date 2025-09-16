// // used for designing the HTML,CSS,JS converstion of Frontend React TSX files
// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import { Label } from './ui/label'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
// import { Textarea } from './ui/textarea'
// import { Alert, AlertDescription } from './ui/alert'
// import { Eye, EyeOff } from 'lucide-react'

// interface SignupFormProps {
//   onSignup: (userData: any) => Promise<void>
// }

// export function SignupForm({ onSignup }: SignupFormProps) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     role: '',
//     company: '',
//     phone: '',
//     interests: ''
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       await onSignup(formData)
//     } catch (err: any) {
//       setError(err.message || 'Signup failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   const handleRoleChange = (role: string) => {
//     setFormData(prev => ({
//       ...prev,
//       role
//     }))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="name">Full Name</Label>
//           <Input
//             id="name"
//             name="name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//           />
//         </div>
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

//       <div className="space-y-2">
//         <Label htmlFor="role">Role</Label>
//         <Select onValueChange={handleRoleChange} required>
//           <SelectTrigger>
//             <SelectValue placeholder="Select your role" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="admin">ITFC Staff (Administrator)</SelectItem>
//             <SelectItem value="exhibitor">Exhibitor</SelectItem>
//             <SelectItem value="visitor">Visitor (Guest)</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {formData.role === 'exhibitor' && (
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="company">Company Name</Label>
//             <Input
//               id="company"
//               name="company"
//               required
//               value={formData.company}
//               onChange={handleChange}
//               placeholder="Enter your company name"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               name="phone"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter your phone number"
//             />
//           </div>
//         </div>
//       )}

//       {formData.role === 'visitor' && (
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter your phone number"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="interests">Areas of Interest</Label>
//             <Textarea
//               id="interests"
//               name="interests"
//               value={formData.interests}
//               onChange={handleChange}
//               placeholder="What are you interested in at the trade fair?"
//               rows={3}
//             />
//           </div>
//         </div>
//       )}

//       <Button type="submit" className="w-full" disabled={loading || !formData.role}>
//         {loading ? 'Creating Account...' : 'Create Account'}
//       </Button>
//     </form>
//   )
// }