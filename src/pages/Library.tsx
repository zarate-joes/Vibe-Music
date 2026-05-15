import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'
import Navbar from '../components/layout/Navbar'
import Modal from '../components/ui/Modal' // <-- IMPORT MODAL

interface SavedTrack {
  id: string
  match_score: number
  saved_at: string
  music_library: {
    track_name: string
    artists: string
    track_genre: string
    url_youtube: string
  }
}

export default function Library() {
  const { dark } = useTheme()
  const { user } = useAuth()
  
  const [tracks, setTracks] = useState<SavedTrack[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // <-- ADD MODAL STATE
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState({ title: '', body: '' })

  useEffect(() => {
    async function fetchLibrary() {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('saved_tracks')
          .select(`
            id,
            match_score,
            saved_at,
            music_library (
              track_name,
              artists,
              track_genre,
              url_youtube
            )
          `)
          .eq('user_id', user.id)
          .order('saved_at', { ascending: false })

        if (error) throw error
        
        if (data) {
          setTracks(data as any)
        }
      } catch (error: any) {
        console.error("Error fetching library:", error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLibrary()
  }, [user])

  const handleRemoveTrack = async (savedTrackId: string) => {
    try {
      // 1. Instantly remove it from the UI for a snappy feel
      setTracks(prev => prev.filter(t => t.id !== savedTrackId))

      // 2. Delete it from the Supabase database
      const { error } = await supabase
        .from('saved_tracks')
        .delete()
        .eq('id', savedTrackId)

      if (error) throw error
    } catch (error: any) {
      console.error("Error removing track:", error.message)
      // 3. If it fails, show the custom Modal instead of an alert!
      setModalMessage({ title: 'Deletion Error', body: 'Failed to remove track from your library. The database may be out of sync.' })
      setModalOpen(true)
    }
  }

  const bg = dark ? 'bg-music-black' : 'bg-[#f4f6fa]'
  const cardBg = dark ? 'bg-music-blue' : 'bg-white'
  const textColor = dark ? 'text-white' : 'text-music-black'
  const subText = dark ? 'text-music-grey/50' : 'text-music-blue/60'
  const border = dark ? 'border-music-grey/20' : 'border-music-black'
  const gridColor = dark ? '#fc6568' : '#181324'
  const shadow = dark ? 'shadow-[8px_8px_0px_0px_#fc6568]' : 'shadow-[8px_8px_0px_0px_#181324]'
  const hoverRow = dark ? 'hover:bg-music-black/40' : 'hover:bg-music-grey/20'

  return (
    <div className={`min-h-screen ${bg} ${textColor} flex flex-col relative transition-colors duration-300`}>
      
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none fixed" style={{
        backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto py-10 px-4 flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            Data <span className="text-music-red">Library</span>
          </h1>
          <p className={`${subText} text-[10px] font-bold tracking-[0.2em] uppercase mt-1`} style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            // 保存されたデータ · Saved Algorithm Results
          </p>
        </div>

        <div className={`${cardBg} border-2 ${border} ${shadow} flex-1 flex flex-col transition-colors duration-300`}>
          
          <div className={`grid grid-cols-12 gap-4 p-4 border-b-2 ${border} text-[9px] font-black tracking-widest uppercase ${subText}`}>
            <div className="col-span-5 md:col-span-4">Track Data</div>
            <div className="col-span-3 hidden md:block">Genre</div>
            <div className="col-span-4 md:col-span-3">Match Score</div>
            <div className="col-span-3 md:col-span-2 text-right">Actions</div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-xs font-black tracking-widest uppercase animate-pulse">
                Querying Database...
              </div>
            ) : tracks.length === 0 ? (
              <div className={`p-16 text-center ${subText} flex flex-col items-center justify-center h-full`}>
                <div className={`w-16 h-16 border-2 border-dashed ${border} flex items-center justify-center mb-4`}>
                  <span className="text-2xl font-black opacity-50">∅</span>
                </div>
                <p className="text-xs font-black tracking-widest uppercase">No records found</p>
                <p className="text-[10px] mt-2 font-bold max-w-xs">Run the Vibe Check algorithm to populate your library with verified matches.</p>
              </div>
            ) : (
              tracks.map((track) => (
                <div 
                  key={track.id} 
                  className={`grid grid-cols-12 gap-4 p-4 border-b ${border} items-center ${hoverRow} transition-colors duration-150`}
                >
                  <div className="col-span-5 md:col-span-4 flex flex-col">
                    <span className="text-sm font-black uppercase truncate">{track.music_library?.track_name || 'Unknown Track'}</span>
                    <span className={`text-[10px] font-bold ${subText} uppercase truncate mt-0.5`}>{track.music_library?.artists || 'Unknown Artist'}</span>
                  </div>

                  <div className="col-span-3 hidden md:flex items-center">
                    <span className={`px-2 py-1 border ${border} text-[8px] font-black tracking-widest uppercase`}>
                      {track.music_library?.track_genre || 'N/A'}
                    </span>
                  </div>

                  <div className="col-span-4 md:col-span-3 flex items-center gap-2">
                    <div className="w-16 h-2 bg-music-black/10 border border-music-black/20 overflow-hidden hidden sm:block">
                      <div 
                        className="h-full bg-music-red" 
                        style={{ width: `${track.match_score}%` }}
                      />
                    </div>
                    <span className="text-xs font-black tracking-widest text-music-red">{track.match_score}%</span>
                  </div>

                  <div className="col-span-3 md:col-span-2 flex justify-end gap-3">
                    {track.music_library?.url_youtube && (
                      <a 
                        href={track.music_library.url_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[10px] font-bold tracking-widest uppercase ${dark ? 'text-music-grey/50 hover:text-white' : 'text-music-blue hover:text-music-black'} transition-colors`}
                      >
                        Play
                      </a>
                    )}
                    <button 
                      onClick={() => handleRemoveTrack(track.id)}
                      className={`text-[10px] font-bold tracking-widest uppercase text-music-red/70 hover:text-music-red transition-colors`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* <-- MOUNT MODAL HERE */}
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