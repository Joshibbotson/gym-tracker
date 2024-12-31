import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Workout } from '../types/Workout';
import { Observable, of } from 'rxjs';
import { WorkoutType } from '../enums/WorkoutType.enum';
import { CaloriePhase } from '../enums/CaloriePhase.enum';

type Activities = {
  data: YearActivities[];
};

type YearActivities = {
  year: number;
  months: MonthActivities[];
};

type MonthActivities = {
  month: Months;
  workouts: Workout[];
};

enum Months {
  JANUARY = 'january',
  FEBRUARY = 'february',
  MARCH = 'march',
  APRIL = 'april',
  MAY = 'may',
  JUNE = 'june',
  JULY = 'july',
  AUGUST = 'august',
  SEPTEMBER = 'september',
  OCTOBER = 'october',
  NOVEMBER = 'november',
  DECEMBER = 'december',
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly apiUrl: string = 'http://localhost:8888';
  private readonly http = inject(HttpClient);
  mockData: Activities = {
    data: [
      {
        year: 2024,
        months: [
          {
            month: Months.JANUARY,
            workouts: [
              {
                date: new Date('2024-01-01T00:00:00Z'),
                config: null,
              },
              {
                date: new Date('2024-01-02T00:00:00Z'),
                config: {
                  weight: 175,
                  workoutType: WorkoutType.PUSH,
                  caloriePhase: CaloriePhase.CUT,
                },
              },
              {
                date: new Date('2024-01-03T00:00:00Z'),
                config: {
                  weight: 180,
                  workoutType: WorkoutType.PULL,
                  caloriePhase: CaloriePhase.CUT,
                },
              },
              {
                date: new Date('2024-01-04T00:00:00Z'),
                config: null,
              },
              {
                date: new Date('2024-01-05T00:00:00Z'),
                config: {
                  weight: 170,
                  workoutType: WorkoutType.LEGS,
                  caloriePhase: CaloriePhase.CUT,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.apiUrl}/workout`, workout);
  }

  public getActivities(): Observable<Activities> {
    return of<Activities>(this.mockData);
  }
}
