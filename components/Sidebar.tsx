import React from 'react';
import { Home, Search, Library, Plus, ArrowRight, ListMusic } from 'lucide-react';
import { Playlist } from '../types';

interface SidebarProps {
  playlists: Playlist[];
  activePlaylistId: string;
  onPlaylistSelect: (playlist: Playlist) => void;
}

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-4 cursor-pointer transition-colors duration-200 ${active ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}>
    <Icon size={24} strokeWidth={active ? 3 : 2} />
    <span className={`font-bold text-sm ${active ? 'text-white' : ''}`}>{label}</span>
  </div>
);

interface PlaylistItemProps {
  name: string;
  author: string;
  coverUrl: string;
  isActive: boolean;
  onClick: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ name, author, coverUrl, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer group transition-colors ${isActive ? 'bg-[#2a2a2a]' : 'hover:bg-[#1a1a1a]'}`}
  >
    <img src={coverUrl} alt={name} className="w-12 h-12 rounded shadow-md object-cover" />
    <div className="flex flex-col overflow-hidden">
      <span className={`text-sm font-normal truncate ${isActive ? 'text-[#1ed760]' : 'text-white group-hover:text-white'}`}>{name}</span>
      <span className="text-[#b3b3b3] text-xs truncate">Playlist • {author}</span>
    </div>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ playlists, activePlaylistId, onPlaylistSelect }) => {
  return (
    <div className="w-[280px] bg-black flex flex-col gap-2 p-2 h-full hidden md:flex">
      <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-5">
        <SidebarItem icon={Home} label="Home" active />
        <SidebarItem icon={Search} label="Search" />
      </div>
      
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 shadow-lg z-10">
          <div className="flex items-center justify-between text-[#b3b3b3] mb-4">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <Library size={24} />
              <span className="font-bold">Your Library</span>
            </div>
            <div className="flex items-center gap-2">
              <Plus size={20} className="hover:text-white cursor-pointer hover:bg-[#2a2a2a] rounded-full p-1 box-content" />
              <ArrowRight size={20} className="hover:text-white cursor-pointer hover:bg-[#2a2a2a] rounded-full p-1 box-content" />
            </div>
          </div>
          <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
            <span className="bg-[#232323] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#2a2a2a] cursor-pointer whitespace-nowrap transition-colors">Playlists</span>
            <span className="bg-[#232323] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#2a2a2a] cursor-pointer whitespace-nowrap transition-colors">Artists</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar">
           <div className="flex items-center justify-between px-2 mb-2 text-[#b3b3b3] text-xs">
              <Search size={16} className="cursor-pointer hover:text-white" />
              <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                <span>Recents</span>
                <ListMusic size={16} />
              </div>
           </div>
           <div className="flex flex-col">
              {playlists.map(p => (
                <PlaylistItem 
                  key={p.id} 
                  name={p.name}
                  author={p.author}
                  coverUrl={p.coverUrl}
                  isActive={p.id === activePlaylistId}
                  onClick={() => onPlaylistSelect(p)}
                />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};