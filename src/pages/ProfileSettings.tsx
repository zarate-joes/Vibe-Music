import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

// Pre-defined options matching your setup
const AVAILABLE_GENRES = ['Pop', 'Rock', 'R&B', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'J-Pop', 'K-Pop', 'Indie', 'Acoustic']
const MOODS = [
  { id: 'chill', label: 'Chill', kanji: 'リラックス' },
  { id: 'energy', label: 'Energy', kanji: 'エネルギッシュ' },
  { id: 'focus', label: 'Focus', kanji: '集中' },
  { id: 'melancholy', label: 'Melancholy', kanji: 'メランコリー' }
]

export default function ProfileSettings() {
  const navigate = useNavigate()
  
  // Mock Read Data (Seamlessly simulating a fetched Supabase user profile)
  const [nickname, setNickname] = useState('Joebert')
  const [age, setAge] = useState('21')
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Electronic', 'J-Pop', 'Indie'])
  const [selectedMood, setSelectedMood] = useState<string | null>('focus')
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    // Simulate Supabase Update (CRUD: Update)
    setTimeout(() => {
      setIsUpdating(false)
      alert('Profile synchronized successfully.')
    }, 1000)
  }

  const handleLogout = () => {
    // Simulate auth sign out
    navigate('/')
  }

  const handleDeleteAccount = () => {
    const confirm = window.confirm("WARNING: This will permanently delete your profile and library data. Proceed?")
    if (confirm) {
      // Simulate Supabase Delete (CRUD: Delete)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-music-black flex flex-col relative overflow-x-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none fixed" style={{
        backgroundImage: 'linear-gradient(#181324 1px,transparent 1px),linear-gradient(90deg,#181324 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white border-4 border-music-black shadow-[12px_12px_0px_0px_#181324] flex flex-col md:flex-row">
          
          {/* Left Column: Dossier & Danger Zone */}
          <div className="md:w-1/3 border-b-4 md:border-b-0 md:border-r-4 border-music-black bg-music-grey/10 flex flex-col justify-between">
            <div className="p-8">
              <div className="w-20 h-20 bg-music-blue border-4 border-music-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#181324]">
                <span className="text-white text-3xl font-black">{nickname.charAt(0)}</span>
              </div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">{nickname}</h1>
              <p className="text-[10px] font-mono text-music-blue mt-1 uppercase tracking-widest">ID: USER_77X_OPM</p>
              
              <div className="mt-8 space-y-4">
                <div className="pb-4 border-b-2 border-music-black border-dashed">
                  <p className="text-[9px] font-bold text-music-black/50 uppercase tracking-widest">Account Status</p>
                  <p className="text-sm font-black uppercase text-music-black mt-1">Authenticated</p>
                </div>
                <div className="pb-4 border-b-2 border-music-black border-dashed">
                  <p className="text-[9px] font-bold text-music-black/50 uppercase tracking-widest">Data Library Size</p>
                  <p className="text-sm font-black uppercase text-music-black mt-1">5 Saved Tracks</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-3 bg-white border-t-4 border-music-black">
              <button 
                onClick={handleLogout}
                className="w-full py-3 border-2 border-music-black text-xs font-black tracking-widest uppercase hover:bg-music-black hover:text-white transition-colors"
              >
                Sign Out
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="w-full py-3 border-2 border-music-red text-music-red text-xs font-black tracking-widest uppercase hover:bg-music-red hover:text-white transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* Right Column: Editable Parameters */}
          <div className="md:w-2/3 p-8">
            <div className="mb-8 border-b-4 border-music-black pb-4">
              <h2 className="text-3xl font-black tracking-tighter uppercase">System Parameters</h2>
              <p className="text-[10px] font-bold tracking-[0.2em] text-music-blue/70 uppercase mt-1">
                // Modify your baseline algorithm weights
              </p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-music-black mb-2">Nickname</label>
                  <input 
                    type="text" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full p-3 bg-transparent border-2 border-music-black focus:outline-none focus:border-music-red text-sm font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-music-black mb-2">Age</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 bg-transparent border-2 border-music-black focus:outline-none focus:border-music-red text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-music-black mb-3">Baseline Genres</label>
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
                            ? 'bg-music-black border-music-black text-white' 
                            : 'bg-white border-music-black/30 text-music-black hover:border-music-black'
                        }`}
                      >
                        {genre}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-music-black mb-3">Default Mood State</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MOODS.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMood(m.id)}
                      className={`p-3 border-2 flex flex-col items-center text-center transition-all ${
                        selectedMood === m.id
                          ? 'bg-music-blue border-music-blue text-white'
                          : 'bg-white border-music-black/30 hover:border-music-black'
                      }`}
                    >
                      <span className="text-[10px] font-black tracking-widest uppercase">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2 border-music-black border-dashed flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`px-8 py-4 font-black text-sm tracking-[0.2em] uppercase border-2 transition-all ${
                    isUpdating
                      ? 'bg-music-grey border-music-grey text-music-black cursor-not-allowed'
                      : 'bg-music-red border-music-red text-white hover:bg-white hover:text-music-red hover:shadow-[4px_4px_0px_0px_#181324] hover:-translate-y-1 hover:-translate-x-1'
                  }`}
                >
                  {isUpdating ? 'Synchronizing...' : 'Update Parameters'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  )
}