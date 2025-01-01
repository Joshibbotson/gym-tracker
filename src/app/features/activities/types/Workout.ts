import { WorkoutConfig } from './WorkoutConfig';

export type Workout = {
  date: Date;
  workoutConfig: WorkoutConfig | null;
};
