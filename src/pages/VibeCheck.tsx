import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { supabase } from '../services/supabaseClient'
import { getLastfmRecommendations } from '../services/lastfmClient'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/ui/Modal' // <-- IMPORT MODAL

const MOODS = [
  { id: 'happy', label: 'Happy', kanji: '幸福' },
  { id: 'sad', label: 'Sad', kanji: '悲哀' },
  { id: 'chill', label: 'Chill', kanji: '冷静' },
  { id: 'energetic', label: 'Energetic', kanji: '活発' },
  { id: 'romantic', label: 'Romantic', kanji: '恋愛' },
  { id: 'angry', label: 'Angry', kanji: '怒り' }
]

const ACTIVITIES = [
  { id: 'study', label: 'Study / Work', icon: '📚' },
  { id: 'workout', label: 'Workout', icon: '💪' },
  { id: 'driving', label: 'Driving', icon: '🚗' },
  { id: 'relax', label: 'Relaxing', icon: '🛋️' },
  { id: 'party', label: 'Party', icon: '🎉' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' }
]

export default function VibeCheck() {
  const navigate = useNavigate()
  const { user } = useAuth() 
  
  const [mood, setMood] = useState<string | null>(null)
  const [activity, setActivity] = useState<string | null>(null)
  const [tempo, setTempo] = useState<number>(120)
  const [isProcessing, setIsProcessing] = useState(false)

  // <-- ADD MODAL STATE
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState({ title: '', body: '' })

  const handleGenerate = async () => {
    if (!mood || !activity || !user) return
    setIsProcessing(true)
    
    try {
      let v_valence = 0.5, v_sentiment = 0.5, v_energy = 0.5, v_danceability = 0.5
      const v_popularity = 0.75 
      
      if (mood === 'happy') { v_valence = 0.9; v_sentiment = 0.8 }
      if (mood === 'sad') { v_valence = 0.2; v_sentiment = 0.2 }
      if (mood === 'chill') { v_valence = 0.6; v_sentiment = 0.5 }
      if (mood === 'energetic') { v_valence = 0.8; v_sentiment = 0.7 }
      if (mood === 'romantic') { v_valence = 0.7; v_sentiment = 0.8 }
      if (mood === 'angry') { v_valence = 0.3; v_sentiment = 0.1 }

      if (activity === 'workout') { v_energy = 0.9; v_danceability = 0.7 }
      if (activity === 'study') { v_energy = 0.3; v_danceability = 0.2 }
      if (activity === 'party') { v_energy = 0.8; v_danceability = 0.9 }
      if (activity === 'relax') { v_energy = 0.2; v_danceability = 0.3 }
      if (activity === 'driving') { v_energy = 0.6; v_danceability = 0.5 }
      if (activity === 'gaming') { v_energy = 0.7; v_danceability = 0.4 }

      const v_tempo = tempo / 200;
      const queryVector = [v_popularity, v_tempo, v_energy, v_valence, v_danceability, v_sentiment]

      const { data: profileData } = await supabase
        .from('profiles')
        .select('baseline_genres')
        .eq('id', user.id)
        .single()

      const userGenres = profileData?.baseline_genres?.map((g: string) => g.toLowerCase()) || []

      const { data: supabaseData, error } = await supabase.rpc('match_tracks', {
        query_embedding: queryVector,
        match_threshold: 0.5, 
        match_count: 6,           
        user_genres: userGenres   
      })
      if (error) throw error
      
      // ==========================================
      // BRAIN 2: THE LAST.FM SUB-BRAIN
      // ==========================================
      let externalData: any[] = []
      
      if (supabaseData && supabaseData.length > 0) {
        // Grab the top match from Supabase
        const topMatch = supabaseData[0] 
        
        if (topMatch.artists && topMatch.track_name) {
          try {
            // Ask Last.fm for 3 global tracks based on your AI's top pick
            externalData = await getLastfmRecommendations(topMatch.artists, topMatch.track_name, 3)
          } catch (apiErr) {
            console.error("Last.fm Sub-Brain failed:", apiErr)
          }
        }
      }

      // ==========================================
      // THE HYBRID MERGE
      // ==========================================
      const combinedResults = [...(supabaseData || []), ...externalData]

      // Route to dashboard!
      navigate('/dashboard', { state: { results: combinedResults, vector: queryVector } })

    } catch (error: any) {
      console.error("ML Query Error:", error.message)
      // <-- REPLACED ALERT WITH MODAL
      setModalMessage({ title: 'Engine Failure', body: 'Algorithm execution failed. Please check your connection and try again.' })
      setModalOpen(true)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-music-black flex flex-col relative overflow-x-hidden">
      
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#181324 1px,transparent 1px),linear-gradient(90deg,#181324 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center py-10 px-4">
        
        <div className="w-full max-w-4xl bg-white border-4 border-music-black shadow-[12px_12px_0px_0px_#181324]">
          
          <div className="bg-music-blue text-white px-8 py-6 border-b-4 border-music-black flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">Diagnostic Engine</h1>
              <p className="text-music-grey/70 text-[11px] font-bold tracking-[0.25em] uppercase mt-1">
                // Input parameters for Hybrid ML Scoring
              </p>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-music-red border border-music-black animate-pulse" />
              <span className="w-3 h-3 bg-[#f4f6fa] border border-music-black" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            <div className="border-r-0 md:border-r-4 border-music-black flex flex-col">
              
              <div className="p-8 border-b-4 border-music-black flex-1">
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-lg font-black tracking-widest uppercase">1. Current Mood</h2>
                  <span className="text-[10px] font-bold text-music-red">REQUIRED</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {MOODS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMood(m.id)}
                      className={`p-3 border-2 text-left transition-all ${
                        mood === m.id
                          ? 'bg-music-red border-music-red text-white shadow-[4px_4px_0px_0px_#181324] translate-x-[-2px] translate-y-[-2px]'
                          : 'bg-music-grey/30 border-music-black hover:bg-music-grey hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#181324]'
                      }`}
                    >
                      <span className="block text-sm font-black tracking-widest uppercase">{m.label}</span>
                      <span className="block text-[10px] opacity-70 mt-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{m.kanji}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-music-grey/20">
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-lg font-black tracking-widest uppercase">2. Target Tempo</h2>
                  <span className="text-[10px] font-bold text-music-blue">OPTIONAL</span>
                </div>
                
                <div className="mb-4 flex justify-between items-end">
                  <span className="text-5xl font-black tracking-tighter text-music-blue">{tempo}</span>
                  <span className="text-sm font-bold tracking-widest uppercase text-music-black/60 mb-1">BPM</span>
                </div>

                <input 
                  type="range" 
                  min="60" 
                  max="180" 
                  step="5"
                  value={tempo}
                  onChange={(e) => setTempo(Number(e.target.value))}
                  className="w-full h-2 bg-music-black appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-music-red [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-music-black"
                />
                
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-music-black/50 mt-2 uppercase">
                  <span>Slow (60)</span>
                  <span>Fast (180+)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              
              <div className="p-8 border-b-4 border-music-black flex-1">
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-lg font-black tracking-widest uppercase">3. Current Activity</h2>
                  <span className="text-[10px] font-bold text-music-red">REQUIRED</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {ACTIVITIES.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setActivity(a.id)}
                      className={`p-4 border-2 flex items-center gap-3 transition-all ${
                        activity === a.id
                          ? 'bg-music-blue border-music-blue text-white shadow-[4px_4px_0px_0px_#181324] translate-x-[-2px] translate-y-[-2px]'
                          : 'bg-white border-music-black hover:bg-music-grey hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#181324]'
                      }`}
                    >
                      <span className="text-2xl">{a.icon}</span>
                      <span className="text-xs font-black tracking-widest uppercase leading-tight">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-music-black text-white flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-music-red uppercase mb-1">System Status:</p>
                  <p className="text-xs font-mono">
                    {mood && activity ? '> READY FOR COMPILE' : '> AWAITING PARAMETERS...'}
                  </p>
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={!mood || !activity || isProcessing}
                  className={`w-full py-6 border-2 font-black text-xl tracking-[0.2em] uppercase transition-all duration-300 ${
                    !mood || !activity
                      ? 'bg-transparent border-music-grey/20 text-music-grey/20 cursor-not-allowed'
                      : isProcessing
                        ? 'bg-transparent border-music-red text-music-red cursor-wait animate-pulse'
                        : 'bg-music-red border-music-red text-white hover:bg-white hover:text-music-red hover:shadow-[6px_6px_0px_0px_#fc6568] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                  }`}
                >
                  {isProcessing ? 'Processing Data...' : 'Run Algorithm'}
                </button>
              </div>

            </div>
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