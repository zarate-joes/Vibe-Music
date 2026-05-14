import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext' // <-- Import AuthProvider
import ProtectedRoute from './components/layout/ProtectedRoute' // <-- Import Bouncer

import AuthPage from './pages/AuthPage'
import ProfileSetup from './pages/ProfileSetup'
import VibeCheck from './pages/VibeCheck'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import ProfileSettings from './pages/ProfileSettings'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> {/* <-- Wrap the router in the AuthProvider */}
        <BrowserRouter>
          <Routes>
            {/* PUBLIC ROUTE: Anyone can see the login page */}
            <Route path="/" element={<AuthPage />} />
            
            {/* SECURE ROUTES: Wrapped in the ProtectedRoute component */}
            <Route path="/setup" element={
              <ProtectedRoute><ProfileSetup /></ProtectedRoute>
            } />
            <Route path="/vibe" element={
              <ProtectedRoute><VibeCheck /></ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute><Library /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><ProfileSettings /></ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App