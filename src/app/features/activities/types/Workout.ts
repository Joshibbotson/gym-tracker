import { WorkoutConfig } from './WorkoutConfig';

export type Workout = {
  date: Date;
  config: WorkoutConfig | null;
};
