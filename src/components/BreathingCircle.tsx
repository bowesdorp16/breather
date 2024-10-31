import React from 'react';
import { BreathingState, Exercise } from '../types';

type Props = {
  isActive: boolean;
  breathingState: BreathingState;
  progress: number;
  selectedExercise: Exercise;
};

export function BreathingCircle({ isActive, breathingState, progress, selectedExercise }: Props) {
  const circleSize = breathingState === 'inhale' 
    ? 40 + (progress * 0.6)
    : breathingState === 'exhale'
    ? 100 - (progress * 0.6)
    : 100;

  return (
    <div className="relative flex items-center justify-center w-72 h-72">
      <div 
        className="absolute w-64 h-64 rounded-full bg-blue-900/20 
          shadow-[inset_-8px_-8px_12px_rgba(255,255,255,0.05),inset_8px_8px_12px_rgba(0,0,0,0.2)]
          animate-pulse-slow"
      />
      <div
        className="absolute rounded-full flex items-center justify-center text-lg font-light transform-gpu"
        style={{
          width: `${circleSize}%`,
          height: `${circleSize}%`,
          background: 'linear-gradient(145deg, #172554, #1e3a8a)',
          boxShadow: '8px 8px 16px rgba(0,0,0,0.25), -8px -8px 16px rgba(255,255,255,0.1)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {isActive && (
          <div className="text-center text-white/90">
            <div className="text-xl capitalize font-light text-shadow">{breathingState}</div>
            <div className="text-sm opacity-75">
              {Math.ceil((100 - progress) * selectedExercise[breathingState] / 100)}s
            </div>
          </div>
        )}
      </div>
    </div>
  );
}