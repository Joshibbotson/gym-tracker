import { WorkoutConfig } from './WorkoutConfig';

export type Workout = {
  _id: string;
  date: Date;
  workoutConfig: WorkoutConfig | null;
};
