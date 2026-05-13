import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const { dark, toggleTheme } = useTheme()

  const navLinks = [
    { path: '/vibe', label: 'Vibe Check', kanji: '分析' },
    { path: '/dashboard', label: 'Dashboard', kanji: '結果' },
    { path: '/library', label: 'Library', kanji: '保存' }
  ]

  // Dynamic theme colors for the Navbar structure
  const navBg = dark ? 'bg-music-black' : 'bg-white'
  const navBorder = dark ? 'border-music-grey/20' : 'border-music-black'
  const textColor = dark ? 'text-white' : 'text-music-black'
  const linkHoverBg = dark ? 'hover:bg-music-grey/10' : 'hover:bg-music-grey'

  return (
    <nav className={`w-full ${navBg} border-b-4 ${navBorder} sticky top-0 z-50 flex items-center justify-between px-6 py-0 transition-colors duration-300`}>
      
      {/* Brand Logo - NOW FUNCTIONAL */}
      <div className={`py-4 pr-6 border-r-2 ${navBorder} transition-colors duration-300`}>
        <Link to="/dashboard" className="flex items-baseline gap-1 group">
          <span className={`${textColor} font-black text-xl tracking-tighter uppercase transition-colors group-hover:opacity-70`}>Vibe</span>
          <span className="text-music-red font-black text-xl">.</span>
          <span className="text-music-blue font-black text-xl tracking-tighter uppercase group-hover:opacity-70">Music</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex px-6">
        {navLinks.map((link) => {
          const isActive = location.pathname.includes(link.path)
          return (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center px-6 py-4 border-r-2 ${navBorder} transition-all duration-300 ${
                isActive 
                  ? 'bg-music-red text-white' 
                  : `bg-transparent ${textColor} ${linkHoverBg}`
              }`}
            >
              <span className="text-xs font-black tracking-[0.15em] uppercase">{link.label}</span>
              <span className={`text-[9px] mt-0.5 transition-colors duration-300 ${
                isActive 
                  ? 'text-white/80' 
                  : dark ? 'text-music-grey/50' : 'text-music-blue/60'
              }`} style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                // {link.kanji}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Right Side: Theme Toggle & Profile */}
      <div className={`py-4 pl-6 border-l-2 ${navBorder} flex items-center gap-6 transition-colors duration-300`}>
        
        {/* Global Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-1.5 px-2 py-1 border transition-all duration-200 ${
            dark 
              ? 'border-music-grey/20 text-music-grey/50 hover:border-music-red hover:text-music-red' 
              : 'border-music-black/20 text-music-black/60 hover:border-music-red hover:text-music-red'
          }`}
          title="Toggle theme"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">
            {dark ? '☀ Light' : '☾ Dark'}
          </span>
        </button>

        {/* User Profile Hook */}
        <Link to="/profile" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-music-blue border-2 border-music-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            <span className="text-white text-xs font-black">P1</span>
          </div>
        </Link>
      </div>
    </nav>
  )
}