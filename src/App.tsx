import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ExerciseSelector } from './components/ExerciseSelector';
import { BreathingCircle } from './components/BreathingCircle';
import { Exercise, BreathingState } from './types';

const exercises: Exercise[] = [
  { name: 'Relaxing Breath (4-7-8)', inhale: 4, hold: 7, exhale: 8, rest: 0 },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, rest: 4 },
  { name: 'Calming Breath', inhale: 6, hold: 0, exhale: 6, rest: 0 },
  { name: 'Energizing Breath', inhale: 2, hold: 0, exhale: 2, rest: 0 },
  { name: 'Stress Relief (5-5-5)', inhale: 5, hold: 5, exhale: 5, rest: 0 },
  { name: 'Deep Relaxation', inhale: 7, hold: 0, exhale: 11, rest: 0 }
];

function App() {
  const [isActive, setIsActive] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(exercises[0]);
  const [breathingState, setBreathingState] = useState<BreathingState>('inhale');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let duration: number;
    switch (breathingState) {
      case 'inhale':
        duration = selectedExercise.inhale;
        break;
      case 'hold':
        duration = selectedExercise.hold;
        break;
      case 'exhale':
        duration = selectedExercise.exhale;
        break;
      case 'rest':
        duration = selectedExercise.rest;
        break;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          let nextState: BreathingState = 'inhale';
          switch (breathingState) {
            case 'inhale':
              nextState = selectedExercise.hold > 0 ? 'hold' : 'exhale';
              break;
            case 'hold':
              nextState = 'exhale';
              break;
            case 'exhale':
              nextState = selectedExercise.rest > 0 ? 'rest' : 'inhale';
              break;
            case 'rest':
              nextState = 'inhale';
              break;
          }
          setBreathingState(nextState);
          return 0;
        }
        return prev + (100 / (duration * 1000 / 16.67));
      });
    }, 16.67);

    return () => clearInterval(interval);
  }, [isActive, breathingState, selectedExercise]);

  return (
    <div className="min-h-screen animate-gradient bg-gradient-to-br from-blue-950 via-blue-800 to-blue-900 text-white/90 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center space-y-10">
        <Header />
        
        <ExerciseSelector
          exercises={exercises}
          selectedExercise={selectedExercise}
          isActive={isActive}
          onExerciseChange={(exercise) => {
            setIsActive(false);
            setSelectedExercise(exercise);
          }}
        />

        <BreathingCircle
          isActive={isActive}
          breathingState={breathingState}
          progress={progress}
          selectedExercise={selectedExercise}
        />

        <button
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) {
              setBreathingState('inhale');
              setProgress(0);
            }
          }}
          className="px-8 py-4 rounded-xl text-lg font-medium transition-all text-white/90
            bg-gradient-to-br from-blue-800 to-blue-900
            shadow-[8px_8px_16px_rgba(0,0,0,0.25),-8px_-8px_16px_rgba(255,255,255,0.1)]
            active:shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.1)]
            active:transform active:scale-95"
        >
          {isActive ? 'Stop' : 'Start'}
        </button>

        {!isActive && (
          <div className="text-center text-sm text-white/70 px-8 py-4 rounded-xl
            bg-blue-900/20 shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.05),inset_4px_4px_8px_rgba(0,0,0,0.2)]">
            <p>Select a breathing exercise and press start</p>
            <p>Find a comfortable position and relax</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;