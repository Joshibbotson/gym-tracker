import { Workout } from './Workout';

export type YearActivity = {
  year: number;
  months: MonthActivity[];
};

export type MonthActivity = {
  month: number;
  workouts: Workout[];
};
