import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react' // 
import Navbar from '../components/layout/Navbar'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'
import Modal from '../components/ui/Modal'

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { dark } = useTheme()
  const { user } = useAuth()
  
 const [results, setResults] = useState<any[] | null>(() => {
    if (location.state?.results) {
      localStorage.setItem('vibe_cache_results', JSON.stringify(location.state.results))
      return location.state.results
    }
    const cached = localStorage.getItem('vibe_cache_results')
    return cached ? JSON.parse(cached) : null
  })
  const [savingId, setSavingId] = useState<string | number | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState({ title: '', body: '' })

  const handleSaveTrack = async (trackId: number | string, similarity: number | string) => {
    if (!user) return
    setSavingId(trackId)

    try {
      const { error } = await supabase
        .from('saved_tracks')
        .insert({
          user_id: user.id,
          track_id: trackId,
          match_score: typeof similarity === 'number' ? Math.round(similarity * 100) : 99 
        })

      if (error) throw error
      setModalMessage({ title: 'Success', body: 'Track synchronized to your personal library.' })
      setModalOpen(true)
    } catch (error: any) {
      console.error("Save Error:", error.message)
      setModalMessage({ title: 'Data Collision', body: 'Failed to save. This track may already exist in your library.' })
      setModalOpen(true)
    } finally {
      setSavingId(null)
    }
  }

  // ── Theme Tokens ────────────────────────────────────────────────────
  const bg = dark ? 'bg-music-black' : 'bg-[#f4f6fa]'
  const cardBg = dark ? 'bg-music-blue' : 'bg-white'
  const textColor = dark ? 'text-white' : 'text-music-black'
  const subText = dark ? 'text-music-grey/50' : 'text-music-blue/60'
  const border = dark ? 'border-music-grey/20' : 'border-music-black'
  const gridColor = dark ? '#fc6568' : '#181324'
  const shadow = dark ? 'shadow-[8px_8px_0px_0px_#fc6568]' : 'shadow-[8px_8px_0px_0px_#181324]'

  return (
    <div className={`min-h-screen ${bg} ${textColor} flex flex-col relative transition-colors duration-300`}>
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none fixed" style={{
        backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Algorithm <span className="text-music-red">Output</span></h1>
            <p className={`${subText} text-[10px] font-bold tracking-[0.2em] uppercase mt-1`}>// Hybrid Ensemble Results</p>
          </div>
          <button 
            onClick={() => navigate('/vibe')}
            className={`px-6 py-3 border-2 ${border} text-[10px] font-black tracking-widest uppercase hover:text-music-red hover:border-music-red transition-all`}
          >
            ← Re-run Vibe Check
          </button>
        </div>

        {!results ? (
          <div className={`${cardBg} border-4 ${border} ${shadow} p-16 text-center flex flex-col items-center justify-center`}>
            <span className="text-4xl mb-4 opacity-50">⚡</span>
            <h2 className="text-xl font-black uppercase mb-2">No Active Data Stream</h2>
            <p className={`text-xs font-bold uppercase tracking-widest ${subText}`}>Initialize the Vibe Check engine to generate vectors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((track: any, index: number) => {
              const isSpotify = track.track_genre === 'Spotify Global';
              
              return (
                <div key={track.id} className={`${cardBg} border-4 ${border} ${shadow} flex flex-col transition-transform hover:-translate-y-1 relative overflow-hidden`}>
                  
                  {/* Badge for Spotify Tracks */}
                  {isSpotify && (
                    <div className="absolute top-0 right-0 bg-[#1DB954] text-white text-[8px] font-black tracking-widest px-3 py-1 uppercase z-10">
                      Spotify API
                    </div>
                  )}

                  <div className={`p-4 border-b-2 ${border} bg-music-black/5 flex justify-between items-center`}>
                    <span className={`text-[10px] font-black tracking-widest uppercase ${isSpotify ? 'text-[#1DB954]' : 'text-music-red'}`}>
                      {isSpotify ? 'Global Match' : `Internal 0${index + 1}`}
                    </span>
                    <span className="text-xs font-black">
                      {typeof track.similarity === 'number' ? `${Math.round(track.similarity * 100)}% Sync` : 'AI Seed Match'}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col relative z-0">
                    {/* Optional Album Art Background for Spotify Tracks */}
                    {track.album_art && (
                      <div 
                        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center z-[-1]" 
                        style={{ backgroundImage: `url(${track.album_art})` }}
                      />
                    )}

                    <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight mb-1 line-clamp-2">{track.track_name}</h3>
                    <p className={`text-xs font-bold uppercase tracking-widest ${subText} mb-6 line-clamp-1`}>{track.artists}</p>
                    
                    <div className="mt-auto pt-6 border-t-2 border-dashed border-music-grey/20 flex gap-3">
                      {/* Play Button logic: YouTube for Supabase, Spotify URL for Spotify */}
                      {(track.url_youtube || track.external_url) && (
                        <a 
                          href={track.url_youtube || track.external_url} target="_blank" rel="noopener noreferrer"
                          className={`flex-1 py-3 text-center border-2 ${border} text-[10px] font-black tracking-widest uppercase hover:bg-music-black hover:text-white transition-colors`}
                        >
                          Play
                        </a>
                      )}
                      
                      <button 
                        onClick={() => handleSaveTrack(track.id, track.similarity)}
                        disabled={savingId === track.id || isSpotify}
                        className={`flex-1 py-3 text-center border-2 text-[10px] font-black tracking-widest uppercase transition-colors 
                          ${isSpotify 
                            ? 'border-music-grey/30 text-music-grey/50 cursor-not-allowed' 
                            : 'border-music-red text-music-red hover:bg-music-red hover:text-white disabled:opacity-50'}`}
                      >
                        {isSpotify ? 'External' : savingId === track.id ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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