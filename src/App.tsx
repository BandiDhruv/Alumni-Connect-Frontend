import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { UserProfile } from './components/UserProfile'
import { JobOpportunities } from './pages/JobOpportunities'
import { AlumniDirectory } from './pages/AlumniDirectory'
import { Home } from './pages/Home'
import { AuthProvider, useAuth } from './Context/AuthContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alumni-profile"
              element={
                <ProtectedRoute>
                  <UserProfile isAlumni={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <JobOpportunities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alumni"
              element={
                <ProtectedRoute>
                  <AlumniDirectory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

