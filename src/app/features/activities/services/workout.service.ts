import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Workout } from '../types/Workout';
import { Observable, of } from 'rxjs';
import { WorkoutType } from '../enums/WorkoutType.enum';
import { CaloriePhase } from '../enums/CaloriePhase.enum';
import { Months } from '../enums/Months.enum';
import { Activities } from '../types/Activities';

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
        months: Array.from({ length: 12 }, (_, monthIndex) => {
          const month = monthIndex + 1;
          const daysInMonth = new Date(2024, month, 0).getDate(); // Get days in the month
          return {
            month: Object.values(Months)[monthIndex],
            workouts: Array.from({ length: daysInMonth }, (_, dayIndex) => {
              const day = dayIndex + 1;
              return {
                date: new Date(
                  `2024-${month.toString().padStart(2, '0')}-${day
                    .toString()
                    .padStart(2, '0')}T00:00:00Z`
                ),
                config:
                  day % 2 === 0
                    ? {
                        weight: 170 + ((day + month) % 5),
                        workoutType:
                          Object.values(WorkoutType)[
                            day % Object.values(WorkoutType).length
                          ],
                        caloriePhase:
                          Object.values(CaloriePhase)[
                            day % Object.values(CaloriePhase).length
                          ],
                      }
                    : null,
              };
            }),
          };
        }),
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
