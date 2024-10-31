import React from 'react';
import { Wind } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-blue-900/20
      shadow-[8px_8px_16px_rgba(0,0,0,0.25),-8px_-8px_16px_rgba(255,255,255,0.1)]">
      <Wind className="w-8 h-8 text-white/90" />
      <h1 className="text-3xl font-light text-white/90 text-shadow">Breathe</h1>
    </div>
  );
}