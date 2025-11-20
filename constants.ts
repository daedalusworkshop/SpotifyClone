import { Playlist, Song } from './types';

// BEST PRACTICES FOR AUDIO SOURCES:
// 1. Reliability: Using direct storage links (ia800... and files.freemusicarchive.org) avoids redirect chains.
// 2. Performance: Direct links are faster and support range requests.
// 3. Licensing: All content is Public Domain (Librivox) or Creative Commons (FMA archives).

const SLAM_POETRY_SONGS: Song[] = [
  {
    id: 'sp-1',
    title: 'The Raven',
    artist: 'Edgar Allan Poe',
    album: 'Classic Poetry Vol 1',
    duration: '8:42',
    imageUrl: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?w=300&h=300&fit=crop',
    audioUrl: 'https://ia800304.us.archive.org/28/items/Poetry_001/The_Raven_128kb.mp3'
  },
  {
    id: 'sp-2',
    title: 'Invictus',
    artist: 'William Ernest Henley',
    album: 'Fortitude Collection',
    duration: '1:15',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
    audioUrl: 'https://ia902606.us.archive.org/14/items/short_poetry_038_librivox/invictus_henley_ear_64kb.mp3'
  },
  {
    id: 'sp-3',
    title: 'The Road Not Taken',
    artist: 'Robert Frost',
    album: 'Mountain Interval',
    duration: '1:10',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=300&h=300&fit=crop',
    audioUrl: 'https://ia802606.us.archive.org/14/items/short_poetry_038_librivox/roadnottaken_frost_ear_64kb.mp3'
  },
  {
    id: 'sp-4',
    title: 'Ozymandias',
    artist: 'Percy Bysshe Shelley',
    album: 'Romantic Era',
    duration: '1:12',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=300&h=300&fit=crop',
    audioUrl: 'https://ia802606.us.archive.org/14/items/short_poetry_038_librivox/ozymandias_shelley_ear_64kb.mp3'
  }
];

// NOTE: While actual Jacob Collier tracks are copyright protected and cannot be hosted here,
// we use high-quality Jazz/Funk/Complex instrumental tracks from the Free Music Archive (via Archive.org)
// that match the musical complexity and "vibe" of his work.

const JACOB_COLLIER_VIBES_SONGS: Song[] = [
  {
    id: 'jc-1',
    title: 'Night Owl',
    artist: 'Broke For Free',
    album: 'Directionless EP',
    duration: '3:18',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3'
  },
  {
    id: 'jc-2',
    title: 'Algorithms',
    artist: 'Chad Crouch',
    album: 'Arps',
    duration: '4:02',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_01_-_Algorithms.mp3'
  },
  {
    id: 'jc-3',
    title: 'Enthusiast',
    artist: 'Tours',
    album: 'Enthusiast',
    duration: '3:11',
    imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=300&h=300&fit=crop',
    audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3'
  },
  {
    id: 'jc-4',
    title: 'Shipping Lanes',
    artist: 'Chad Crouch',
    album: 'Arps',
    duration: '3:52',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop',
    audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_02_-_Shipping_Lanes.mp3'
  }
];

const LOFI_CODING_SONGS: Song[] = [
  {
    id: 'lf-1',
    title: 'Sepia',
    artist: 'Podington Bear',
    album: 'Piano I',
    duration: '2:45',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=300&h=300&fit=crop',
    audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Podington_Bear/Piano_I/Podington_Bear_-_Sepia.mp3'
  },
  {
    id: 'lf-2',
    title: 'Starling',
    artist: 'Podington Bear',
    album: 'Solo Piano',
    duration: '3:12',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop',
    audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Podington_Bear/Solo_Piano/Podington_Bear_-_Starling.mp3'
  }
];

export const PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Slam Poetry Classics',
    description: 'Spoken word, raw emotion, and timeless snaps.',
    author: 'PoetryFoundation',
    coverUrl: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?w=600&h=600&fit=crop',
    gradientColor: 'from-amber-900',
    songs: SLAM_POETRY_SONGS
  },
  {
    id: 'p2',
    name: 'Jacob Collier Energy',
    description: 'Harmonies, syncopation, and multi-instrumental madness.',
    author: 'Jacob Collier',
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop',
    gradientColor: 'from-indigo-900',
    songs: JACOB_COLLIER_VIBES_SONGS
  },
  {
    id: 'p3',
    name: 'Deep Focus',
    description: 'Music to help you concentrate and code.',
    author: 'Spotify',
    coverUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600&h=600&fit=crop',
    gradientColor: 'from-blue-900',
    songs: LOFI_CODING_SONGS
  }
];