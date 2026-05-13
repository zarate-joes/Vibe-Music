import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const MusicNote = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute font-black select-none pointer-events-none transition-colors duration-300"
    style={{ ...style, color: 'currentColor', opacity: 0.12 }}>
    ♪
  </div>
)

interface FieldBlockProps {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  focused: boolean
  onFocus: () => void
  onBlur: () => void
  dark: boolean
}

function FieldBlock({ id, label, type, placeholder, value, onChange, focused, onFocus, onBlur, dark }: FieldBlockProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-150 ${
          focused ? 'text-music-red' : dark ? 'text-music-grey/50' : 'text-music-blue/70'
        }`}
      >
        {label}
      </label>
      <div className={`relative border-b-2 transition-colors duration-150 ${
        focused ? 'border-music-red' : dark ? 'border-music-grey/20' : 'border-music-black/15'
      }`}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full bg-transparent py-2.5 text-sm focus:outline-none pr-8 transition-colors duration-300 ${
            dark
              ? 'text-music-grey placeholder:text-music-grey/20'
              : 'text-music-black placeholder:text-music-blue/30'
          }`}
          autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'nickname'}
        />
        <span className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-150 ${
          focused ? 'bg-music-red scale-100' : dark ? 'bg-music-grey/20 scale-75' : 'bg-music-black/20 scale-75'
        }`} />
      </div>
    </div>
  )
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { dark, toggleTheme } = useTheme() // Set to false by default to showcase your new Light Mode
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate a backend login/register, then navigate!
    setTimeout(() => {
      setIsLoading(false)
      
      if (isLogin) {
        // If logging in, maybe go to dashboard (we'll route to setup for now to test)
        navigate('/setup')
      } else {
        // If registering, definitely go to setup
        navigate('/setup')
      }
    }, 1800)
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setEmail(''); setPassword(''); setNickname('')
  }

  // ── Theme tokens (Updated for Architectural Light Mode) ──────────────────
  const bg             = dark ? 'bg-music-black'        : 'bg-music-grey'
  const cardBg         = dark ? 'bg-music-blue'         : 'bg-[#f4f6fa]' // Very slight off-white for structural contrast
  const headerBg       = dark ? 'bg-music-black'        : 'bg-transparent'
  const headerBorder   = dark ? 'border-music-grey/10'  : 'border-music-black/20' // Starker grid lines in light mode
  const cardBorder     = dark ? 'border-music-grey/15'  : 'border-music-black/20'
  const noteColor      = dark ? 'text-music-red'        : 'text-music-red/40'
  
  // Typography dynamically shifting to ensure contrast against light backgrounds
  const titleText      = dark ? 'text-white'            : 'text-music-black'
  const musicText      = dark ? 'text-music-grey'       : 'text-music-blue'
  const tabInactive    = dark
    ? 'text-music-grey/35 hover:text-music-grey/70'
    : 'text-music-black/40 hover:text-music-black/80'
  const sectionLbl     = dark ? 'text-music-grey/35'    : 'text-music-blue/60'
  const dividerBorder  = dark ? 'border-music-grey/15'  : 'border-music-black/15'
  const switchLbl      = dark ? 'text-music-grey/30'    : 'text-music-blue/60'
  const switchBtnCls   = dark
    ? 'text-music-grey/50 border-music-grey/20 hover:text-music-red hover:border-music-red'
    : 'text-music-black/60 border-music-black/20 hover:text-music-red hover:border-music-red'
  const socialLine     = dark ? 'bg-music-grey/10'      : 'bg-music-black/10'
  const socialText     = dark ? 'text-music-grey/25'    : 'text-music-black/40'
  const socialBtn      = dark
    ? 'border-music-grey/15 text-music-grey/35 hover:border-music-grey/35 hover:text-music-grey/70'
    : 'border-music-black/15 text-music-black/50 hover:border-music-black/40 hover:text-music-black/80'
  const footerText     = dark ? 'text-music-grey/20'    : 'text-music-black/40'
  const forgotColor    = dark
    ? 'text-music-grey/35 hover:text-music-red'
    : 'text-music-blue/60 hover:text-music-red'
  const liveText       = dark ? 'text-music-grey/30'    : 'text-music-black/50'
  const subText        = dark ? 'text-music-grey/30'    : 'text-music-black/50'
  const toggleBorder   = dark
    ? 'border-music-grey/20 text-music-grey/50 hover:border-music-red hover:text-music-red'
    : 'border-music-black/20 text-music-black/60 hover:border-music-red hover:text-music-red'
  
  // Dynamic grid color mapping
  const gridColor      = dark ? '#fc6568'               : '#181324'

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500`}>

      {/* Grid bg - Shifts from neon red in dark mode to architectural dark grey in light mode */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-music-red" />

      {/* Floating notes */}
      {mounted && (
        <div className={noteColor}>
          <MusicNote style={{ top: '8%',  left: '6%',  fontSize: '3rem',   transform: 'rotate(-15deg)' }} />
          <MusicNote style={{ top: '18%', left: '82%', fontSize: '2rem',   transform: 'rotate(10deg)'  }} />
          <MusicNote style={{ top: '72%', left: '10%', fontSize: '1.5rem', transform: 'rotate(-8deg)'  }} />
          <MusicNote style={{ top: '80%', left: '88%', fontSize: '2.5rem', transform: 'rotate(20deg)'  }} />
          <MusicNote style={{ top: '45%', left: '2%',  fontSize: '1.2rem', transform: 'rotate(5deg)'   }} />
          <MusicNote style={{ top: '55%', left: '94%', fontSize: '1.8rem', transform: 'rotate(-12deg)' }} />
        </div>
      )}

      {/* ── Card ── */}
      <div className={`relative w-full max-w-sm transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Shadow layer - Remains stark red to pop against the light grey canvas */}
        <div className={`absolute inset-0 translate-x-[6px] translate-y-[6px] ${dark ? 'bg-music-red' : 'bg-music-red'} transition-colors duration-300`} />

        <div className={`relative ${cardBg} border-2 ${cardBorder} overflow-hidden transition-colors duration-300`}>

          {/* Header */}
          <div className={`${headerBg} border-b-2 ${headerBorder} px-6 py-5 flex items-start justify-between transition-colors duration-300`}>
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`${titleText} font-black text-2xl tracking-tighter uppercase transition-colors duration-300`}>Vibe</span>
                <span className="text-music-red font-black text-2xl">.</span>
                <span className={`${musicText} font-black text-2xl tracking-tighter uppercase transition-colors duration-300`}>Music</span>
              </div>
              <p className={`${subText} text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 transition-colors duration-300`}
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                AI Recommendation Engine&nbsp;·&nbsp;Powered by ML
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 mt-1">
              {/* Live badge */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-music-red animate-pulse" />
                <span className={`${liveText} text-[9px] font-bold tracking-widest uppercase transition-colors duration-300`}>Live</span>
              </div>

              {/* Theme toggle */}
                <button
                  onClick={toggleTheme} // <-- Change this from setDark(!dark) to toggleTheme
                  className={`flex items-center gap-1.5 px-2 py-1 border transition-all duration-200 ${toggleBorder}`}
                  title="Toggle theme"
                >
                <span className="text-[10px] font-black tracking-widest uppercase">
                  {dark ? '☀ Light' : '☾ Dark'}
                </span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className={`grid grid-cols-2 border-b-2 ${headerBorder}`}>
            {(['Login', 'Register'] as const).map((label, i) => {
              const active = (i === 0) === isLogin
              return (
                <button
                  key={label}
                  onClick={() => setIsLogin(i === 0)}
                  className={`py-3 text-xs font-black tracking-[0.15em] uppercase transition-all duration-200 ${
                    active ? 'bg-music-red text-white' : `bg-transparent ${tabInactive}`
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Form */}
          <div className="px-6 py-7">
            <p className={`${sectionLbl} text-[11px] font-bold tracking-[0.18em] uppercase mb-6 transition-colors duration-300`}
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
              {isLogin ? 'ア // Access your account' : '新 // Create a new profile'}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Nickname — register only */}
              <div className={`overflow-hidden transition-all duration-300 ${!isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <FieldBlock id="nickname" label="Nickname" type="text" placeholder="e.g. Taro"
                  value={nickname} onChange={setNickname}
                  focused={focused === 'nickname'} onFocus={() => setFocused('nickname')} onBlur={() => setFocused(null)}
                  dark={dark} />
              </div>

              <FieldBlock id="email" label="Email Address" type="email" placeholder="user@domain.com"
                value={email} onChange={setEmail}
                focused={focused === 'email'} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                dark={dark} />

              <FieldBlock id="password" label="Password" type="password" placeholder="••••••••"
                value={password} onChange={setPassword}
                focused={focused === 'password'} onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                dark={dark} />

              {isLogin && (
                <div className="flex justify-end -mt-1">
                  <button type="button" className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${forgotColor}`}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-2 py-4 font-black text-sm tracking-[0.2em] uppercase border-2 transition-all duration-200 active:scale-[0.98] ${
                  isLoading
                    ? 'bg-transparent border-music-red/20 text-music-red/25 cursor-not-allowed'
                    : 'bg-music-red border-music-red text-white hover:bg-transparent hover:text-music-red'
                }`}
              >
                {isLoading ? '処Loading...' : isLogin ? 'Login →' : 'Create Profile →'}
              </button>
            </form>

            {/* Switch mode */}
            <div className={`mt-7 pt-5 border-t border-dashed ${dividerBorder} flex items-center justify-between transition-colors duration-300`}>
              <span className={`text-[10px] font-bold tracking-widest uppercase ${switchLbl} transition-colors duration-300`}>
                {isLogin ? 'New here?' : 'Have an account?'}
              </span>
              <button
                onClick={switchMode}
                className={`text-[10px] font-black tracking-[0.15em] uppercase border-b border-dashed pb-0.5 transition-colors ${switchBtnCls}`}
              >
                {isLogin ? 'Create Profile' : 'Back to Login'}
              </button>
            </div>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              <div className={`flex-1 h-px ${socialLine} transition-colors duration-300`} />
              <span className={`text-[9px] font-bold tracking-widest uppercase ${socialText} transition-colors duration-300`}>Or continue with</span>
              <div className={`flex-1 h-px ${socialLine} transition-colors duration-300`} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {['Google', 'GitHub'].map((p) => (
                <button key={p} type="button"
                  className={`py-2.5 border text-[10px] font-black tracking-widest uppercase transition-all ${socialBtn}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5">
            <p className={`text-[9px] text-center tracking-wider leading-relaxed ${footerText} transition-colors duration-300`}>
              By continuing, you agree to our Terms of Service.<br />
              Your data is stored securely via Supabase.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}