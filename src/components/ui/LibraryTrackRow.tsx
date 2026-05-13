import { useState } from 'react'

export interface LibraryTrackProps {
  id: string
  title: string
  artist: string
  genre: string
  addedAt: string
  onRemove: (id: string) => void
}

export default function LibraryTrackRow({ id, title, artist, genre, addedAt, onRemove }: LibraryTrackProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleRemove = () => {
    setIsDeleting(true)
    // Simulate database deletion delay
    setTimeout(() => {
      onRemove(id)
    }, 400)
  }

  return (
    <div 
      className={`group flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white border-b-2 border-x-2 first:border-t-2 border-music-black hover:bg-music-grey/20 transition-all duration-300 ${
        isDeleting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="w-12 h-12 bg-music-blue border-2 border-music-black flex items-center justify-center shadow-[2px_2px_0px_0px_#181324] group-hover:bg-music-red transition-colors">
          <span className="text-white text-lg">♪</span>
        </div>
        <div>
          <h3 className="text-sm font-black tracking-tighter uppercase">{title}</h3>
          <p className="text-[10px] font-bold tracking-widest uppercase text-music-blue/70">{artist}</p>
        </div>
      </div>

      {/* Meta Data & Actions */}
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        <span className="px-2 py-1 bg-music-black text-white text-[9px] font-bold tracking-widest uppercase">
          {genre}
        </span>
        
        <span className="text-[10px] font-mono text-music-black/50 hidden sm:block">
          {addedAt}
        </span>

        <button 
          onClick={handleRemove}
          className="px-4 py-2 bg-transparent border-2 border-music-black text-[10px] font-black tracking-widest uppercase text-music-black hover:bg-music-red hover:text-white hover:border-music-red transition-colors active:scale-95"
        >
          Remove
        </button>
      </div>
    </div>
  )
}