import { Component, input, SimpleChanges } from '@angular/core';
import { MonthActivity } from '../../types/Activities';
import { DayComponent } from '../day/day.component';
import { MonthFromNumberPipe } from '../../../../core/pipes/month-from-number.pipe';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from 'date-fns';
import { Workout } from '../../types/Workout';

@Component({
  selector: 'month',
  standalone: true,
  imports: [DayComponent, MonthFromNumberPipe],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
})
export class MonthComponent {
  monthActivity = input.required<MonthActivity>();

  calendarGrid: (Workout[] | null)[][] = [];

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['monthActivity']) {
      this.generateCalendar();
    }
  }

  generateCalendar() {
    const { workouts, month } = this.monthActivity();

    // Get the first and last day of the month
    const firstDay = startOfMonth(
      new Date(new Date().getFullYear(), month - 1)
    );
    const lastDay = endOfMonth(firstDay);

    // Generate all dates for the month
    const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

    // Create an empty grid (6 weeks x 7 days to cover edge cases)
    const grid: (Workout[] | null)[][] = Array.from({ length: 6 }, () =>
      Array(7).fill(null)
    );

    // Map workouts to their respective dates
    const workoutMap: Map<string, Workout[]> = new Map();
    // workouts.map((workout) => [
    //   format(new Date(workout.date), 'yyyy-MM-dd'),
    //   workout,
    // ])

    for (let i = 0; i < workouts.length; i++) {
      const key = format(new Date(workouts[i].date), 'yyyy-MM-dd');
      const existingWorkouts = workoutMap.get(key);
      if (existingWorkouts) {
        workoutMap.set(key, [...existingWorkouts, workouts[i]]);
      } else {
        workoutMap.set(key, [workouts[i]]);
      }
    }

    console.log('workoutMap:', workoutMap);

    // Fill the grid
    let weekIndex = 0;
    for (const date of daysInMonth) {
      const dayIndex = getDay(date); // Sunday = 0, Monday = 1, ..., Saturday = 6
      const formattedDate = format(date, 'yyyy-MM-dd');

      // Place the workout (or null if no workout) in the grid
      grid[weekIndex][dayIndex] = workoutMap.get(formattedDate) || null;

      // Move to the next week if it's Saturday
      if (dayIndex === 6) {
        weekIndex++;
      }
    }
    // console.log('grid:', grid);
    this.calendarGrid = grid;
  }
}
