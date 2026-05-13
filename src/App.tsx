import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext' // <-- Import the provider

import AuthPage from './pages/AuthPage'
import ProfileSetup from './pages/ProfileSetup'
import VibeCheck from './pages/VibeCheck'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import ProfileSettings from './pages/ProfileSettings'

function App() {
  return (
    <ThemeProvider> {/* <-- Wrap everything inside this */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/setup" element={<ProfileSetup />} />
          <Route path="/vibe" element={<VibeCheck />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App