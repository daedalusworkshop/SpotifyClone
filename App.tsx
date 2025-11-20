import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainView } from './components/MainView';
import { Player } from './components/Player';
import { PLAYLISTS } from './constants';
import { Playlist, Song } from './types';

export default function App() {
  const [activePlaylist, setActivePlaylist] = useState<Playlist>(PLAYLISTS[0]);
  const [currentSong, setCurrentSong] = useState<Song>(PLAYLISTS[0].songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- Audio Effects ---

  // Handle Play/Pause when isPlaying changes or song changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Prevent circular structure error by logging only the message
          console.error("Playback failed:", error instanceof Error ? error.message : String(error));
          
          // Don't automatically set isPlaying to false here immediately to allow for buffering,
          // but generally good to handle if it's a hard error.
          if (error && error.name === "NotAllowedError") {
             // User interaction required
             setIsPlaying(false);
          }
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Initial Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);


  // --- Handlers ---

  const playSong = useCallback((song: Song) => {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      // Reset progress for new song
      setProgress(0);
      setCurrentTime(0);
    }
  }, [currentSong, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      if (!isNaN(cur)) setCurrentTime(cur);
      if (!isNaN(dur) && dur > 0) {
        setDuration(dur);
        setProgress((cur / dur) * 100);
      }
    }
  };

  const handleSeek = (val: number) => {
    if (audioRef.current && duration) {
      const newTime = (val / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(val);
      setCurrentTime(newTime);
    }
  };

  const handleNext = () => {
    const currentIndex = activePlaylist.songs.findIndex(s => s.id === currentSong.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % activePlaylist.songs.length;
      setCurrentSong(activePlaylist.songs[nextIndex]);
      setIsPlaying(true);
    } else {
      // If song is not in current playlist (rare case), just loop the first song of active playlist
      setCurrentSong(activePlaylist.songs[0]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    const currentIndex = activePlaylist.songs.findIndex(s => s.id === currentSong.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + activePlaylist.songs.length) % activePlaylist.songs.length;
      setCurrentSong(activePlaylist.songs[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    // Prevent circular structure error by not logging the event object
    const target = e.currentTarget;
    const error = target.error;
    console.error("Audio Error:", error ? `Code: ${error.code}, Message: ${error.message}` : "Unknown error");
    // Optional: Show a toast or visual indicator
    setIsPlaying(false);
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden font-sans text-white select-none">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleNext}
        onLoadedMetadata={handleTimeUpdate}
        onError={handleAudioError}
      />
      
      <div className="flex-1 flex overflow-hidden pb-[90px]">
        <Sidebar 
          playlists={PLAYLISTS} 
          activePlaylistId={activePlaylist.id} 
          onPlaylistSelect={setActivePlaylist} 
        />
        <MainView 
          playlist={activePlaylist}
          currentSongId={currentSong.id}
          isPlaying={isPlaying}
          onSongSelect={playSong}
        />
      </div>

      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={setVolume}
      />
    </div>
  );
}