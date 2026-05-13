import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// Pre-defined options for the UI
const AVAILABLE_GENRES = [
  'Pop', 'Rock', 'R&B', 'Hip-Hop', 'Electronic', 
  'Jazz', 'Classical', 'J-Pop', 'K-Pop', 'Indie', 'Acoustic'
]

const MOODS = [
  { id: 'chill', label: 'Chill / Relaxed', kanji: 'リラックス' },
  { id: 'energy', label: 'High Energy', kanji: 'エネルギッシュ' },
  { id: 'focus', label: 'Deep Focus', kanji: '集中' },
  { id: 'melancholy', label: 'Melancholy', kanji: 'メランコリー' }
]

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { dark } = useTheme() // <-- Global theme state
  
  const [age, setAge] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [artistInput, setArtistInput] = useState('')
  const [artists, setArtists] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // ── Theme Tokens ───────────────────────────────────────────
  const bg = dark ? 'bg-music-black' : 'bg-[#f4f6fa]'
  const cardBg = dark ? 'bg-music-blue' : 'bg-white'
  const headerBg = dark ? 'bg-music-black' : 'bg-white'
  const textColor = dark ? 'text-white' : 'text-music-black'
  const subText = dark ? 'text-music-grey/50' : 'text-music-blue/60'
  const border = dark ? 'border-music-grey/20' : 'border-music-black'
  const gridColor = dark ? '#fc6568' : '#181324'
  const shadow = dark ? 'shadow-[8px_8px_0px_0px_#fc6568]' : 'shadow-[8px_8px_0px_0px_#181324]'
  const hoverSection = dark ? 'hover:bg-music-black/30' : 'hover:bg-[#fafafa]'
  const inputBorder = dark ? 'border-music-grey/40 focus:border-music-red' : 'border-music-black focus:border-music-red'
  
  // ── Handlers ───────────────────────────────────────────────
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  const addArtist = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return
    e.preventDefault()
    
    const trimmed = artistInput.trim()
    if (trimmed && !artists.includes(trimmed)) {
      setArtists([...artists, trimmed])
      setArtistInput('')
    }
  }

  const removeArtist = (artistToRemove: string) => {
    setArtists(artists.filter(a => a !== artistToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate Supabase API call
    setTimeout(() => {
      setIsSaving(false)
      console.log('Saved Profile:', { age, selectedGenres, artists, selectedMood })
      
      // Automatically route to the Vibe Check engine
      navigate('/vibe')
    }, 1500)
  }

  return (
    <div className={`min-h-screen ${bg} ${textColor} flex flex-col items-center py-12 px-4 relative transition-colors duration-500`}>
      
      {/* Architectural Background Grid */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      {/* Main Container */}
      <div className={`relative w-full max-w-2xl ${cardBg} border-2 ${border} ${shadow} z-10 flex flex-col transition-all duration-300`}>
        
        {/* Header Section */}
        <div className={`border-b-2 ${border} ${headerBg} px-8 py-6 flex items-end justify-between transition-colors duration-300`}>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">
              Profile <span className="text-music-red">Setup</span>
            </h1>
            <p className={`${subText} text-[10px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors`}
               style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
              // プロファイル設定 · Step 1 of 1
            </p>
          </div>
          <div className="hidden sm:flex gap-1">
            <span className={`w-2 h-2 ${dark ? 'bg-music-grey/30' : 'bg-music-black'}`}></span>
            <span className="w-2 h-2 bg-music-red"></span>
            <span className={`w-2 h-2 ${dark ? 'bg-music-grey/50' : 'bg-music-blue'}`}></span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          
          {/* Section 1: Demographics */}
          <div className={`border-b-2 ${border} p-8 flex flex-col md:flex-row gap-6 ${hoverSection} transition-colors`}>
            <div className="md:w-1/3">
              <h2 className="text-sm font-black tracking-widest uppercase">Demographics</h2>
              <p className={`text-xs ${subText} mt-1 font-medium transition-colors`}>Used to refine generational music trends.</p>
            </div>
            <div className="md:w-2/3">
              <label className={`block text-[10px] font-bold tracking-widest uppercase ${subText} mb-2 transition-colors`}>
                Age
              </label>
              <input 
                type="number" 
                min="13" max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 21"
                className={`w-32 p-3 bg-transparent border-2 ${inputBorder} focus:outline-none transition-colors text-sm font-bold`}
                required
              />
            </div>
          </div>

          {/* Section 2: Genres */}
          <div className={`border-b-2 ${border} p-8 flex flex-col md:flex-row gap-6 ${hoverSection} transition-colors`}>
            <div className="md:w-1/3">
              <h2 className="text-sm font-black tracking-widest uppercase">Top Genres</h2>
              <p className={`text-xs ${subText} mt-1 font-medium transition-colors`}>Select your baseline preferences.</p>
            </div>
            <div className="md:w-2/3 flex flex-wrap gap-2">
              {AVAILABLE_GENRES.map(genre => {
                const isSelected = selectedGenres.includes(genre)
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border-2 transition-all ${
                      isSelected 
                        ? `bg-music-red border-music-red text-white ${dark ? 'shadow-[2px_2px_0px_0px_#ffffff]' : 'shadow-[2px_2px_0px_0px_#181324]'} translate-x-[-2px] translate-y-[-2px]` 
                        : `bg-transparent ${border} ${textColor} hover:bg-music-red/10 hover:border-music-red`
                    }`}
                  >
                    {genre}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section 3: Artists */}
          <div className={`border-b-2 ${border} p-8 flex flex-col md:flex-row gap-6 ${hoverSection} transition-colors`}>
            <div className="md:w-1/3">
              <h2 className="text-sm font-black tracking-widest uppercase">Favorite Artists</h2>
              <p className={`text-xs ${subText} mt-1 font-medium transition-colors`}>Press enter or click add to append.</p>
            </div>
            <div className="md:w-2/3">
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  value={artistInput}
                  onChange={(e) => setArtistInput(e.target.value)}
                  onKeyDown={addArtist}
                  placeholder="e.g. Taylor Swift"
                  className={`flex-1 p-3 bg-transparent border-2 ${inputBorder} focus:outline-none transition-colors text-sm font-bold`}
                />
                <button 
                  type="button"
                  onClick={addArtist}
                  className={`px-6 ${dark ? 'bg-music-grey text-music-black' : 'bg-music-black text-white'} font-black text-xs tracking-widest uppercase border-2 ${dark ? 'border-music-grey hover:bg-music-red hover:border-music-red hover:text-white' : 'border-music-black hover:bg-music-red'} transition-colors`}
                >
                  Add
                </button>
              </div>
              
              {/* Tag Container */}
              <div className="flex flex-wrap gap-2 min-h-[32px]">
                {artists.length === 0 && (
                  <span className={`text-xs ${subText} font-bold italic transition-colors`}>No artists added yet.</span>
                )}
                {artists.map(artist => (
                  <div key={artist} className={`flex items-center ${dark ? 'bg-music-black/40 border-music-grey/20' : 'bg-music-grey border-music-black'} border pl-3 pr-1 py-1 text-xs font-bold uppercase transition-colors`}>
                    <span>{artist}</span>
                    <button 
                      type="button"
                      onClick={() => removeArtist(artist)}
                      className="ml-2 w-5 h-5 flex items-center justify-center hover:text-music-red transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Baseline Mood */}
          <div className={`border-b-2 ${border} p-8 flex flex-col md:flex-row gap-6 ${hoverSection} transition-colors`}>
            <div className="md:w-1/3">
              <h2 className="text-sm font-black tracking-widest uppercase">Baseline Mood</h2>
              <p className={`text-xs ${subText} mt-1 font-medium transition-colors`}>Your default listening state.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 gap-3">
              {MOODS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-4 border-2 flex flex-col items-start transition-all ${
                    selectedMood === m.id
                      ? `bg-music-blue border-music-blue text-white ${dark ? 'shadow-[4px_4px_0px_0px_#ffffff]' : 'shadow-[4px_4px_0px_0px_#181324]'} translate-x-[-2px] translate-y-[-2px]`
                      : `bg-transparent ${border} ${textColor} hover:bg-music-red/10 hover:border-music-red`
                  }`}
                >
                  <span className="text-xs font-black tracking-widest uppercase">{m.label}</span>
                  <span className={`text-[10px] mt-1 ${selectedMood === m.id ? 'opacity-70' : subText} transition-colors`} style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {m.kanji}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className={`p-8 ${dark ? 'bg-music-black/20' : 'bg-music-grey/30'} flex justify-end transition-colors`}>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-10 py-4 font-black text-sm tracking-[0.2em] uppercase border-2 transition-all duration-200 ${
                isSaving
                  ? 'bg-transparent border-music-red/20 text-music-red/50 cursor-not-allowed'
                  : `bg-music-red border-music-red text-white ${dark ? 'hover:bg-transparent' : 'hover:bg-white'} hover:text-music-red hover:shadow-[4px_4px_0px_0px_#fc6568] hover:-translate-y-1 hover:-translate-x-1`
              }`}
            >
              {isSaving ? 'Saving Data...' : 'Initialize Algorithm →'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}