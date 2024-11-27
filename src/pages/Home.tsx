import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrbitingIcons } from '@/components/OrbitingIcons'
import { useAuth } from '@/Context/AuthContext'
import { motion } from 'framer-motion'
// import { GraduationCap, Users, Briefcase, BookOpen } from 'lucide-react'

export function Home() {
  const { isAuthenticated, login, signup } = useAuth()
  
  // Updated type for signupData
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  
  // Updated type for signupData
  const [signupData, setSignupData] = useState<{ email: string; password: string; type: 'student' | 'alumni' }>({
    email: '',
    password: '',
    type: 'student', // Default value
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(loginData.email, loginData.password)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    await signup(signupData.email, signupData.password, signupData.type)
  }

  if (isAuthenticated) {
    return <AuthenticatedHome />
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col lg:flex-row items-center gap-8 py-12">
        <motion.div 
          className="flex-1 space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Connect, Grow, and Thrive Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
            Join India's largest college alumni network. Bridge the gap between students and alumni to create meaningful connections and opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </motion.div>
        <motion.div 
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OrbitingIcons />
        </motion.div>
      </section>

      {/* Auth Section */}
      <motion.section 
        className="py-12 bg-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">Login</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <form onSubmit={handleSignup}>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Join our community today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-type">I am a</Label>
                      <select 
                        id="user-type" 
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={signupData.type}
                        onChange={(e) => setSignupData({ ...signupData, type: e.target.value as 'student' | 'alumni' })}
                      >
                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">Sign Up</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
    </div>
  )
}

function AuthenticatedHome() {
  return (
    <div className="space-y-8 py-8">
      <motion.section 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold">Welcome Back!</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Complete your profile to connect better</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[100px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground">Profile completion: 65%</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Update Profile</Button>
              </CardFooter>
            </Card>
          </motion.div>
          {/* Add similar motion.div wrappers for other cards */}
        </div>
      </motion.section>
    </div>
  )
}
