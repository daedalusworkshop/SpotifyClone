import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  Heart, 
  MoreHorizontal, 
  Clock3, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Playlist, Song } from '../types';

interface MainViewProps {
  playlist: Playlist;
  currentSongId: string | undefined;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
}

interface SongRowProps {
  index: number;
  song: Song;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

const SongRow: React.FC<SongRowProps> = ({ index, song, isActive, isPlaying, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 items-center p-2 px-4 rounded-md cursor-pointer group hover:bg-[#2a2a2a] ${isActive ? 'bg-[#ffffff1a]' : ''}`}
    >
      <div className="w-5 text-[#b3b3b3] text-sm text-right flex justify-end min-w-[20px]">
        {isActive && isPlaying ? (
          <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" className="h-3.5" alt="playing" />
        ) : isActive ? (
           <span className="text-[#1ed760]">{index}</span>
        ) : hover ? (
          <Play size={14} fill="white" className="text-white" />
        ) : (
          <span className="text-[#b3b3b3]">{index}</span>
        )}
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <img src={song.imageUrl} alt={song.title} className="w-10 h-10 rounded flex-shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className={`text-sm font-normal truncate ${isActive ? 'text-[#1ed760]' : 'text-white'}`}>{song.title}</span>
          <span className="text-[#b3b3b3] text-xs hover:underline hover:text-white cursor-pointer truncate">{song.artist}</span>
        </div>
      </div>
      <div className="text-[#b3b3b3] text-sm hover:underline hover:text-white cursor-pointer truncate hidden md:block">
        {song.album}
      </div>
      <div className="text-[#b3b3b3] text-sm font-variant-numeric tabular-nums flex items-center gap-4 justify-end">
        <Heart size={16} className={`opacity-0 group-hover:opacity-100 hover:text-white transition-all hover:scale-105 ${isActive ? 'opacity-100 text-[#1ed760]' : ''}`} />
        <span>{song.duration}</span>
        <MoreHorizontal size={16} className="opacity-0 group-hover:opacity-100 hover:text-white" />
      </div>
    </div>
  );
};

export const MainView: React.FC<MainViewProps> = ({ playlist, currentSongId, isPlaying, onSongSelect }) => {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  const handleScroll = () => {
    if (mainContentRef.current) {
      const scrollTop = mainContentRef.current.scrollTop;
      const opacity = Math.min(scrollTop / 200, 1);
      setScrollOpacity(opacity);
    }
  };

  useEffect(() => {
    const el = mainContentRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isCurrentPlaylistPlaying = playlist.songs.some(s => s.id === currentSongId);

  return (
    <div className="flex-1 bg-[#121212] m-2 rounded-lg overflow-hidden relative ml-0 md:ml-0 flex flex-col">
      {/* Top Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 z-20 flex items-center justify-between px-6 transition-colors duration-300"
        style={{ backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})` }}
      >
        <div className="flex gap-2">
          <button className="bg-black/70 rounded-full p-1 cursor-not-allowed opacity-60 border-none">
            <ChevronLeft size={24} />
          </button>
          <button className="bg-black/70 rounded-full p-1 cursor-not-allowed opacity-60 border-none">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform border-none">
            Explore Premium
          </button>
          <button className="bg-black/70 text-white text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform border-none">
            <div className="bg-amber-600 rounded-full p-1">
              <User size={12} fill="black" className="text-black" />
            </div>
          </button>
        </div>
      </div>

      <div 
        ref={mainContentRef}
        className="flex-1 overflow-y-auto custom-scrollbar relative"
      >
        {/* Dynamic Background Gradient */}
        <div className={`absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b ${playlist.gradientColor} to-[#121212] opacity-80 -z-10 transition-colors duration-700`} />

        {/* Playlist Header */}
        <div className="pt-20 px-6 pb-6 flex items-end gap-6">
          <img src={playlist.coverUrl} className="w-32 h-32 md:w-52 md:h-52 shadow-2xl rounded-sm object-cover" alt="Cover" />
          <div className="flex flex-col gap-2 text-white">
            <span className="text-xs font-bold uppercase hidden md:block">Playlist</span>
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-black tracking-tighter">{playlist.name}</h1>
            <p className="text-[#ffffffb3] text-sm font-medium mt-2 line-clamp-2">{playlist.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium mt-2 text-white/90">
              <span className="hover:underline cursor-pointer font-bold">{playlist.author}</span>
              <span>•</span>
              <span>{playlist.songs.length} songs</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 flex items-center gap-8 bg-gradient-to-b from-black/10 to-[#121212] backdrop-blur-sm sticky top-0 z-10">
          <button 
            onClick={() => onSongSelect(playlist.songs[0])}
            className="w-14 h-14 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1fdf64] transition-all shadow-lg border-none"
          >
            {isPlaying && isCurrentPlaylistPlaying ? <Pause size={24} fill="black" className="text-black" /> : <Play size={24} fill="black" className="text-black ml-1" />}
          </button>
          <Heart size={32} className="text-[#b3b3b3] hover:text-white cursor-pointer" />
          <MoreHorizontal size={32} className="text-[#b3b3b3] hover:text-white cursor-pointer" />
        </div>

        {/* Song List */}
        <div className="px-6 mb-4 min-h-[300px]">
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 text-[#b3b3b3] text-sm border-b border-[#ffffff1a] pb-2 px-4 sticky top-16 bg-[#121212] z-10">
            <div className="text-right w-5">#</div>
            <div>Title</div>
            <div className="hidden md:block">Album</div>
            <div className="flex justify-end"><Clock3 size={16} /></div>
          </div>
          
          <div className="flex flex-col mt-2">
            {playlist.songs.map((song, idx) => (
              <SongRow 
                key={song.id} 
                index={idx + 1} 
                song={song}
                isActive={currentSongId === song.id}
                isPlaying={isPlaying}
                onClick={() => onSongSelect(song)}
              />
            ))}
          </div>
        </div>
          
        <div className="h-24"></div>
      </div>
    </div>
  );
};