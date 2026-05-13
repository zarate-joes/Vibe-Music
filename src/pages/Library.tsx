import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import LibraryTrackRow from '../components/ui/LibraryTrackRow'

// Mock Data representing the user's saved tracks table in Supabase
const INITIAL_LIBRARY = [
  { id: '1', title: 'Cruel Summer', artist: 'Taylor Swift', genre: 'Pop', addedAt: '2026-05-14' },
  { id: '2', title: 'GENTO', artist: 'SB19', genre: 'P-Pop', addedAt: '2026-05-13' },
  { id: '3', title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop', addedAt: '2026-05-12' },
  { id: '4', title: 'Back In Black', artist: 'AC/DC', genre: 'Rock', addedAt: '2026-05-10' },
  { id: '5', title: 'Plastic Love', artist: 'Mariya Takeuchi', genre: 'City Pop', addedAt: '2026-05-09' }
]

export default function Library() {
  const [savedTracks, setSavedTracks] = useState(INITIAL_LIBRARY)

  const handleRemoveTrack = (idToRemove: string) => {
    // In production, this is where you call Supabase: await supabase.from('playlist').delete().eq('id', idToRemove)
    setSavedTracks(currentTracks => currentTracks.filter(track => track.id !== idToRemove))
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
        
        {/* Header Block */}
        <div className="bg-white border-4 border-music-black shadow-[12px_12px_0px_0px_#181324] mb-10">
          <div className="bg-music-blue text-white px-8 py-6 border-b-4 border-music-black flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">Data Library</h1>
              <p className="text-music-grey/70 text-[11px] font-bold tracking-[0.25em] uppercase mt-1">
                // Saved Parameters & Selected Outputs
              </p>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-black">{savedTracks.length}</span>
              <span className="text-[9px] font-mono opacity-70 uppercase tracking-widest">Total Entries</span>
            </div>
          </div>
          
          {/* Controls Bar */}
          <div className="px-8 py-4 bg-music-grey/20 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-music-black text-white text-[9px] font-black tracking-widest uppercase hover:bg-music-red transition-colors">
                Sort by Date
              </button>
              <button className="px-4 py-2 bg-white border border-music-black text-music-black text-[9px] font-black tracking-widest uppercase hover:bg-music-grey transition-colors">
                Sort by Genre
              </button>
            </div>
            <div className="text-[10px] font-bold text-music-red uppercase tracking-widest">
              Status: <span className="text-music-black">Synced</span>
            </div>
          </div>
        </div>

        {/* Database List rendering */}
        <div className="bg-transparent">
          {savedTracks.length > 0 ? (
            savedTracks.map((track) => (
              <LibraryTrackRow 
                key={track.id}
                id={track.id}
                title={track.title}
                artist={track.artist}
                genre={track.genre}
                addedAt={track.addedAt}
                onRemove={handleRemoveTrack}
              />
            ))
          ) : (
            <div className="p-12 bg-white border-4 border-music-black border-dashed flex flex-col items-center text-center">
              <span className="text-4xl mb-4">📭</span>
              <h2 className="text-lg font-black tracking-widest uppercase">Library Empty</h2>
              <p className="text-xs font-bold text-music-blue/60 mt-2 uppercase tracking-widest">
                No tracks saved in the database. Run the Vibe Check algorithm to populate your list.
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}