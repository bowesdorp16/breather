import React from 'react';
import { Exercise } from '../types';

type Props = {
  exercises: Exercise[];
  selectedExercise: Exercise;
  isActive: boolean;
  onExerciseChange: (exercise: Exercise) => void;
};

export function ExerciseSelector({ exercises, selectedExercise, isActive, onExerciseChange }: Props) {
  return (
    <div className="w-full">
      <select
        className="w-full bg-blue-900/20 rounded-xl px-6 py-4 text-white/90 font-light
          shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.05),inset_4px_4px_8px_rgba(0,0,0,0.2)]
          border-none outline-none appearance-none cursor-pointer disabled:opacity-50"
        value={selectedExercise.name}
        onChange={(e) => {
          const exercise = exercises.find(ex => ex.name === e.target.value);
          if (exercise) onExerciseChange(exercise);
        }}
        disabled={isActive}
      >
        {exercises.map((ex) => (
          <option key={ex.name} value={ex.name} className="bg-blue-900">
            {ex.name}
          </option>
        ))}
      </select>
    </div>
  );
}