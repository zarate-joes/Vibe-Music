import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useAuth()
  const { dark } = useTheme()

  // Show a slick loading state while Supabase verifies the session
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-music-black text-white' : 'bg-[#f4f6fa] text-music-black'}`}>
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 bg-music-red border-4 border-music-black" />
          <p className="text-[10px] font-black tracking-widest uppercase">Verifying Authorization...</p>
        </div>
      </div>
    )
  }

  // If there is no session, instantly redirect them to the Auth Page ("/")
  if (!session) {
    return <Navigate to="/" replace />
  }

  // If they are authorized, let them see the page!
  return <>{children}</>
}