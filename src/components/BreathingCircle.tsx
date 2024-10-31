import React, { useMemo } from 'react';
import { BreathingState, Exercise } from '../types';

type Props = {
  isActive: boolean;
  breathingState: BreathingState;
  progress: number;
  selectedExercise: Exercise;
};

export function BreathingCircle({ isActive, breathingState, progress, selectedExercise }: Props) {
  const { scale, opacity } = useMemo(() => {
    const baseScale = breathingState === 'inhale' 
      ? 0.4 + (progress * 0.006)
      : breathingState === 'exhale'
      ? 1 - (progress * 0.006)
      : 1;

    
    return {
      scale: baseScale,
      opacity: isActive ? 0.9 : 0.7
    };
  }, [breathingState, progress, isActive]);

  const isHold = breathingState === 'hold';

  return (
    <div className="relative flex items-center justify-center w-72 h-72">
      {/* Outer glow effect */}
      <div 
        className="absolute w-64 h-64 rounded-full bg-blue-500/5 blur-xl transform-gpu transition-transform duration-1000"
        style={{
          transform: `scale(${scale * 1.2})`,
        }}
      />

      {/* Background circle with subtle pulse */}
      <div 
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-blue-900/20 to-blue-800/20
          shadow-[inset_-8px_-8px_12px_rgba(255,255,255,0.05),inset_8px_8px_12px_rgba(0,0,0,0.2)]"
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/5 animate-pulse-slow" />
      </div>

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {isActive && (
          <div className="text-center transition-all duration-300 ease-out"
               style={{ opacity: isHold ? 0.5 : Math.min(1, 2 - scale * 2) }}>
            <div className="text-3xl capitalize font-light tracking-wider text-shadow text-white/90">
              {breathingState}
            </div>
            <div className="text-lg text-white/60">
              {Math.ceil((100 - progress) * selectedExercise[breathingState] / 100)}s
            </div>
          </div>
        )}
      </div>

      {/* Animated breathing circle */}
      <div
        className="absolute w-full h-full rounded-full transform-gpu will-change-transform"
        style={{
          background: 'linear-gradient(145deg, rgba(23, 37, 84, 0.7), rgba(30, 58, 138, 0.7))',
          boxShadow: '8px 8px 16px rgba(0,0,0,0.25), -8px -8px 16px rgba(255,255,255,0.1)',
          transform: `scale(${scale})`,
          opacity,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.6, 1)',
        }}
      >
        {/* Inner highlight effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-blue-400/10 to-transparent" />
      </div>
    </div>
  );
}