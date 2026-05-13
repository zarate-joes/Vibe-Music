import Navbar from '../components/layout/Navbar'
import TrackCard from '../components/ui/TrackCard'

// Mock Data representing the output from your Python ML Backend
const MOCK_RESULTS = [
  {
    id: '1',
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    matchScore: 94,
    tags: ['Pop', '170 BPM', 'Energetic', 'Synth'],
    xaiReasoning: 'Recommended because you selected Pop + Energetic + Workout. This track has a high tempo (170 BPM) and a positive lyrical sentiment score (0.82) which perfectly aligns with your baseline profile.',
    isTopMatch: true
  },
  {
    id: '2',
    title: 'GENTO',
    artist: 'SB19',
    matchScore: 88,
    tags: ['P-Pop', 'Hip-Hop', 'Aggressive', 'Workout'],
    xaiReasoning: 'Matches your "Workout" activity parameter. Content-based filtering shows high energy levels and strong percussive elements suitable for physical exertion.'
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    matchScore: 85,
    tags: ['Pop', '103 BPM', 'Groove', 'Happy'],
    xaiReasoning: 'Selected due to 85% genre similarity to your historical "Pop" preference and a high valence score indicating a happy, energetic mood.'
  }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f4f6fa] text-music-black flex flex-col relative">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none fixed" style={{
        backgroundImage: 'linear-gradient(#181324 1px,transparent 1px),linear-gradient(90deg,#181324 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Active Parameters (Read-only) */}
        <div className="lg:col-span-3">
          <div className="bg-white border-4 border-music-black p-6 sticky top-28 shadow-[8px_8px_0px_0px_#181324]">
            <h2 className="text-sm font-black tracking-widest uppercase mb-4 border-b-2 border-music-black pb-2">
              Active Parameters
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-music-blue/60">Current Mood</p>
                <p className="text-sm font-black tracking-wider uppercase text-music-red">Energetic</p>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-music-blue/60">Activity</p>
                <p className="text-sm font-black tracking-wider uppercase">Workout</p>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-music-blue/60">Algorithm</p>
                <p className="text-xs font-mono bg-music-grey/30 p-1 mt-1 border border-music-black">Hybrid v1.2</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-music-black border-dashed">
              <button className="w-full py-3 bg-music-black text-white text-[10px] font-black tracking-widest uppercase hover:bg-music-red transition-colors">
                Recalibrate →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results Feed */}
        <div className="lg:col-span-9 space-y-8">
          
          <div className="bg-music-blue text-white px-6 py-4 border-4 border-music-black flex justify-between items-center shadow-[6px_6px_0px_0px_#181324]">
            <h1 className="text-2xl font-black tracking-tighter uppercase">Analysis Complete</h1>
            <span className="text-[10px] font-mono opacity-70">3 MATCHES FOUND</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Match takes up full width on medium screens, or just exists as the first item */}
            <div className="md:col-span-2">
              <TrackCard {...MOCK_RESULTS[0]} />
            </div>
            
            {/* Secondary Matches */}
            <TrackCard {...MOCK_RESULTS[1]} />
            <TrackCard {...MOCK_RESULTS[2]} />
          </div>

        </div>

      </main>
    </div>
  )
}