import React from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Heart, Mic2, ListMusic, MonitorSpeaker, Volume2, VolumeX, Maximize2 
} from 'lucide-react';
import { Song } from '../types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

export const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  progress,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange
}) => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  if (!currentSong) return <div className="h-[90px] bg-black border-t border-[#282828]" />;

  return (
    <div className="h-[90px] bg-black border-t border-[#282828] px-4 grid grid-cols-3 items-center z-50 fixed bottom-0 w-full">
      
      {/* Song Info */}
      <div className="flex items-center gap-4 min-w-0">
        <img src={currentSong.imageUrl} alt="cover" className="h-14 w-14 rounded shadow-lg hidden sm:block" />
        <div className="flex flex-col justify-center overflow-hidden">
           <div className="text-sm font-medium text-white hover:underline cursor-pointer truncate">{currentSong.title}</div>
           <div className="text-xs text-[#b3b3b3] hover:underline hover:text-white cursor-pointer truncate">{currentSong.artist}</div>
        </div>
        <Heart size={16} className="text-[#b3b3b3] hover:text-white cursor-pointer ml-2 hidden md:block" />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center max-w-[100%] md:max-w-[45%] w-full justify-self-center gap-1">
        <div className="flex items-center gap-6 text-[#b3b3b3]">
           <Shuffle size={16} className="hover:text-white cursor-pointer hidden md:block" />
           <button onClick={onPrevious} className="hover:text-white">
             <SkipBack size={20} className="fill-current" />
           </button>
           <button 
             className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
             onClick={onPlayPause}
           >
             {isPlaying ? <Pause size={16} fill="black" className="text-black" /> : <Play size={16} fill="black" className="text-black ml-0.5" />}
           </button>
           <button onClick={onNext} className="hover:text-white">
             <SkipForward size={20} className="fill-current" />
           </button>
           <Repeat size={16} className="hover:text-white cursor-pointer hidden md:block" />
        </div>
        
        <div className="w-full flex items-center gap-2 text-xs text-[#a7a7a7] font-variant-numeric tabular-nums">
           <span>{formatTime(currentTime)}</span>
           <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full relative group cursor-pointer">
              {/* Progress Bar Input for Scrubbing */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress} 
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer z-20 top-0 left-0"
              />
              <div className="h-full bg-white group-hover:bg-[#1ed760] rounded-full pointer-events-none absolute top-0 left-0" style={{ width: `${progress}%` }}></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" style={{ left: `${progress}%` }}></div>
           </div>
           <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 text-[#b3b3b3]">
         <Mic2 size={16} className="hover:text-white cursor-pointer hidden lg:block" />
         <ListMusic size={16} className="hover:text-white cursor-pointer hidden lg:block" />
         <MonitorSpeaker size={16} className="hover:text-white cursor-pointer hidden lg:block" />
         <div className="flex items-center gap-2 w-24 group">
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full relative group cursor-pointer">
               <input 
                 type="range" 
                 min="0" 
                 max="1" 
                 step="0.01" 
                 value={volume} 
                 onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                 className="absolute w-full h-full opacity-0 cursor-pointer z-20 top-0 left-0"
               />
               <div className="h-full bg-white group-hover:bg-[#1ed760] rounded-full pointer-events-none absolute top-0 left-0" style={{ width: `${volume * 100}%` }}></div>
            </div>
         </div>
         <Maximize2 size={16} className="hover:text-white cursor-pointer hidden lg:block ml-2" />
      </div>
    </div>
  );
};