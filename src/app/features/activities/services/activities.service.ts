import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Workout } from '../types/Workout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly apiUrl: string = 'http://localhost:8888';
  private readonly http = inject(HttpClient);

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.apiUrl}/workout/create`, workout);
  }

  public getWorkoutById(_id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/workout`);
  }
}
