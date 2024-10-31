export type BreathingState = 'inhale' | 'hold' | 'exhale' | 'rest';

export type Exercise = {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
};