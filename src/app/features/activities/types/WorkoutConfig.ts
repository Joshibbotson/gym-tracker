import { CaloriePhase } from '../enums/CaloriePhase.enum';
import { WorkoutType } from '../enums/WorkoutType.enum';

export type WorkoutConfig = {
  weight?: number;
  workoutType?: WorkoutType;
  caloriePhase?: CaloriePhase;
  chestSize?: number;
  waistSize?: number;
  bicepSize?: number;
  forearmSize?: number;
  thighSize?: number;
  calfSize?: number;
};
