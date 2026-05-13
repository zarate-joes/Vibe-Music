import { useState } from 'react'

export interface TrackProps {
  title: string
  artist: string
  matchScore: number
  tags: string[]
  xaiReasoning: string
  isTopMatch?: boolean
}

export default function TrackCard({ title, artist, matchScore, tags, xaiReasoning, isTopMatch = false }: TrackProps) {
  const [feedback, setFeedback] = useState<'great' | 'bad' | null>(null)
  const [showXai, setShowXai] = useState(isTopMatch)

  return (
    <div className={`relative bg-white border-4 border-music-black transition-all duration-300 ${
      isTopMatch 
        ? 'shadow-[12px_12px_0px_0px_#fc6568] -translate-y-1 -translate-x-1' 
        : 'shadow-[6px_6px_0px_0px_#181324] hover:-translate-y-1 hover:-translate-x-1'
    }`}>
      
      {/* Header - Track Info */}
      <div className="p-5 border-b-4 border-music-black flex justify-between items-start">
        <div>
          {isTopMatch && (
            <span className="inline-block px-2 py-1 bg-music-red text-white text-[9px] font-black tracking-widest uppercase mb-2">
              Primary Match
            </span>
          )}
          <h3 className="text-xl font-black tracking-tighter uppercase leading-tight">{title}</h3>
          <p className="text-music-blue text-sm font-bold tracking-widest uppercase mt-1">{artist}</p>
        </div>
        
        {/* Match Score Badge */}
        <div className="flex flex-col items-end">
          <span className="text-3xl font-black tracking-tighter text-music-black">{matchScore}%</span>
          <span className="text-[9px] font-bold tracking-widest uppercase text-music-blue/60">Match</span>
        </div>
      </div>

      {/* Media / Video Placeholder */}
      <div className="aspect-video bg-music-black w-full relative flex items-center justify-center group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMTgxMzI0Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMDMwMzAiPjwvcmVjdD4KPC9zdmc+')] opacity-50" />
        <div className="w-16 h-12 bg-music-red rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#ffffff]">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </div>
        <span className="absolute bottom-2 right-2 text-[9px] font-mono text-white/50 tracking-widest">YOUTUBE_EMBED_READY</span>
      </div>

      {/* Meta Tags */}
      <div className="p-4 border-b-4 border-music-black border-dashed flex flex-wrap gap-2 bg-[#f4f6fa]">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-white border border-music-black text-[9px] font-bold tracking-widest uppercase text-music-black">
            {tag}
          </span>
        ))}
      </div>

      {/* XAI (Explainable AI) Section */}
      <div className="border-b-4 border-music-black">
        <button 
          onClick={() => setShowXai(!showXai)}
          className="w-full p-3 flex justify-between items-center bg-music-grey/30 hover:bg-music-blue hover:text-white transition-colors text-left"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">
            [+] View Algorithm Reasoning (XAI)
          </span>
        </button>
        
        {showXai && (
          <div className="p-4 bg-music-blue text-white text-xs font-mono leading-relaxed border-t-2 border-music-black">
            <span className="text-music-red font-bold">{'>'} SYSTEM LOG:</span> {xaiReasoning}
          </div>
        )}
      </div>

      {/* Feedback & Actions */}
      <div className="flex bg-white">
        <button 
          onClick={() => setFeedback('great')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 border-r-2 border-music-black transition-colors ${
            feedback === 'great' ? 'bg-music-black text-white' : 'hover:bg-music-grey'
          }`}
        >
          <span className="text-lg">🔥</span>
          <span className="text-[10px] font-black tracking-widest uppercase">Great</span>
        </button>
        <button 
          onClick={() => setFeedback('bad')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 border-r-4 border-music-black transition-colors ${
            feedback === 'bad' ? 'bg-music-red text-white' : 'hover:bg-music-grey'
          }`}
        >
          <span className="text-lg">🗑️</span>
          <span className="text-[10px] font-black tracking-widest uppercase">Poor</span>
        </button>
        
        {/* Playlist Add */}
        <button className="flex-1 p-3 flex items-center justify-center bg-white hover:bg-music-red hover:text-white transition-colors group">
          <span className="text-[10px] font-black tracking-widest uppercase group-hover:hidden">Save</span>
          <span className="text-[10px] font-black tracking-widest uppercase hidden group-hover:block">+ Library</span>
        </button>
      </div>

    </div>
  )
}