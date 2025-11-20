export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  author: string;
  gradientColor: string; // Tailwind class for background gradient
  songs: Song[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number; // 0-100
  currentTime: number;
  duration: number;
}