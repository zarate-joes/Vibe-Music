import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'
import Modal from '../components/ui/Modal'

// Pre-defined options matching your setup
const AVAILABLE_GENRES = [
  'Pop', 
  'Rock', 
  'Hip-Hop', 
  'R&B', 
  'EDM', 
  'Classical', 
  'Jazz', 
  'Country', 
  'Indie', 
  'Lo-Fi', 
  'Metal', 
  'K-Pop',
  'J-Pop', 
  'Latin', 
  'Reggae',
  'Soul',
  'Punk',
  'Acoustic',
  'House',
  'Alternative',
  'Afrobeats'
]

const MOODS = [
  { id: 'chill', label: 'Chill', kanji: 'リラックス' },
  { id: 'energy', label: 'Energy', kanji: 'エネルギッシュ' },
  { id: 'focus', label: 'Focus', kanji: '集中' },
  { id: 'melancholy', label: 'Melancholy', kanji: 'メランコリー' }
]

export default function ProfileSettings() {
  const navigate = useNavigate()
  const { dark } = useTheme()
  const { user } = useAuth()
  
  // State variables for the user data
  const [nickname, setNickname] = useState('')
  const [age, setAge] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  
  // Loading states
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState({ title: '', body: '' })

  // ── 1. READ: Fetch user data on load ──────────────────────────────────
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('nickname, age, baseline_genres, default_mood')
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (data) {
          setNickname(data.nickname || '')
          setAge(data.age ? data.age.toString() : '')
          setSelectedGenres(data.baseline_genres || [])
          setSelectedMood(data.default_mood || null)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchProfile()
  }, [user])

  // ── Handlers ────────────────────────────────────────────────────────
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  // ── 2. UPDATE: Save changes to Supabase ─────────────────────────────
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setIsUpdating(true)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          nickname: nickname,
          age: age ? parseInt(age) : null,
          baseline_genres: selectedGenres,
          default_mood: selectedMood
        })
        .eq('id', user.id)

      if (error) throw error
      setModalMessage({ title: 'Success', body: 'System Parameters synchronized successfully.' })
      setModalOpen(true)
    } catch (error: any) {
      setModalMessage({ title: 'Error', body: 'Failed to update parameters. Please try again.' })
      setModalOpen(true)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogout = async () => {
    // Clear the AI cache so it doesn't bleed over to the next session
    localStorage.removeItem('vibe_cache_results') 
    await supabase.auth.signOut()
    navigate('/')
  }

  // ── Theme Tokens ────────────────────────────────────────────────────
  const bg = dark ? 'bg-music-black' : 'bg-[#f4f6fa]'
  const cardBg = dark ? 'bg-music-blue' : 'bg-white'
  const textColor = dark ? 'text-white' : 'text-music-black'
  const subText = dark ? 'text-music-grey/60' : 'text-music-black/50'
  const border = dark ? 'border-music-grey/20' : 'border-music-black'
  const gridColor = dark ? '#fc6568' : '#181324'
  const shadow = dark ? 'shadow-[12px_12px_0px_0px_#fc6568]' : 'shadow-[12px_12px_0px_0px_#181324]'
  const panelBg = dark ? 'bg-music-black/30' : 'bg-music-grey/10'
  const inputBorder = dark ? 'border-music-grey/40 focus:border-music-red' : 'border-music-black focus:border-music-red'

  if (isLoadingData) {
    return (
      <div className={`min-h-screen ${bg} ${textColor} flex items-center justify-center`}>
        <div className="animate-pulse text-xs font-black tracking-widest uppercase">Loading Dossier...</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bg} ${textColor} flex flex-col relative overflow-x-hidden transition-colors duration-300`}>
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none fixed" style={{
        backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto py-10 px-4">
        <div className={`${cardBg} border-4 ${border} ${shadow} flex flex-col md:flex-row transition-all duration-300`}>
          
          {/* Left Column: Dossier & Danger Zone */}
          <div className={`md:w-1/3 border-b-4 md:border-b-0 md:border-r-4 ${border} ${panelBg} flex flex-col justify-between transition-colors`}>
            <div className="p-8">
              <div className={`w-20 h-20 ${dark ? 'bg-music-black' : 'bg-music-blue'} border-4 ${border} flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]`}>
                <span className="text-white text-3xl font-black">{nickname.charAt(0) || 'U'}</span>
              </div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">{nickname || 'Unknown User'}</h1>
              <p className="text-[10px] font-mono text-music-red mt-1 uppercase tracking-widest truncate" title={user?.id}>ID: {user?.id?.substring(0, 8)}..._OPM</p>
              
              <div className="mt-8 space-y-4">
                <div className={`pb-4 border-b-2 ${border} border-dashed`}>
                  <p className={`text-[9px] font-bold ${subText} uppercase tracking-widest`}>Account Status</p>
                  <p className="text-sm font-black uppercase mt-1 text-music-red">Authenticated</p>
                </div>
                <div className={`pb-4 border-b-2 ${border} border-dashed`}>
                  <p className={`text-[9px] font-bold ${subText} uppercase tracking-widest`}>Email Binding</p>
                  <p className="text-xs font-black mt-1 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className={`p-8 space-y-3 ${cardBg} border-t-4 ${border} transition-colors`}>
              <button 
                onClick={handleLogout}
                className={`w-full py-3 border-2 ${border} text-xs font-black tracking-widest uppercase ${dark ? 'hover:bg-white hover:text-music-black' : 'hover:bg-music-black hover:text-white'} transition-colors`}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Right Column: Editable Parameters */}
          <div className="md:w-2/3 p-8">
            <div className={`mb-8 border-b-4 ${border} pb-4`}>
              <h2 className="text-3xl font-black tracking-tighter uppercase">System Parameters</h2>
              <p className={`text-[10px] font-bold tracking-[0.2em] ${subText} uppercase mt-1`}>
                // Modify your baseline algorithm weights
              </p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={`block text-[10px] font-bold tracking-widest uppercase ${textColor} mb-2`}>Nickname</label>
                  <input 
                    type="text" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={`w-full p-3 bg-transparent border-2 ${inputBorder} focus:outline-none text-sm font-bold uppercase transition-colors`}
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-bold tracking-widest uppercase ${textColor} mb-2`}>Age</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`w-full p-3 bg-transparent border-2 ${inputBorder} focus:outline-none text-sm font-bold transition-colors`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold tracking-widest uppercase ${textColor} mb-3`}>Baseline Genres</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_GENRES.map(genre => {
                    const isSelected = selectedGenres.includes(genre)
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={`px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border-2 transition-all ${
                          isSelected 
                            ? 'bg-music-red border-music-red text-white' 
                            : `bg-transparent ${border} ${textColor} hover:border-music-red hover:text-music-red`
                        }`}
                      >
                        {genre}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold tracking-widest uppercase ${textColor} mb-3`}>Default Mood State</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MOODS.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMood(m.id)}
                      className={`p-3 border-2 flex flex-col items-center text-center transition-all ${
                        selectedMood === m.id
                          ? `bg-music-blue border-music-blue text-white ${dark ? 'shadow-[2px_2px_0px_0px_#ffffff]' : 'shadow-[2px_2px_0px_0px_#181324]'}`
                          : `bg-transparent ${border} hover:border-music-red`
                      }`}
                    >
                      <span className="text-[10px] font-black tracking-widest uppercase">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`pt-6 border-t-2 ${border} border-dashed flex justify-end`}>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`px-8 py-4 font-black text-sm tracking-[0.2em] uppercase border-2 transition-all ${
                    isUpdating
                      ? 'bg-transparent border-music-red/30 text-music-red/50 cursor-not-allowed'
                      : `bg-music-red border-music-red text-white hover:bg-transparent hover:text-music-red ${dark ? 'hover:shadow-[4px_4px_0px_0px_#ffffff]' : 'hover:shadow-[4px_4px_0px_0px_#181324]'} hover:-translate-y-1 hover:-translate-x-1`
                  }`}
                >
                  {isUpdating ? 'Synchronizing...' : 'Update Parameters'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
      {/* Interactive Modal Component */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={modalMessage.title}
      >
        <p>{modalMessage.body}</p>
      </Modal>
    </div>
  )
}