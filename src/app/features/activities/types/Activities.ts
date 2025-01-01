import { Months } from '../enums/Months.enum';
import { Workout } from './Workout';

export type Activities = {
  data: YearActivity[];
};

export type YearActivity = {
  year: number;
  months: MonthActivity[];
};

export type MonthActivity = {
  month: Months;
  workouts: Workout[];
};
