import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Workout } from '../types/Workout';
import { Observable } from 'rxjs';
import { YearActivity } from '../types/Activities';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.apiUrl}/workout`, workout);
  }

  public getActivities(): Observable<YearActivity[]> {
    return this.http.get<YearActivity[]>(`${this.apiUrl}/workout`);
  }

  public getWorkoutById(_id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/workout/${_id}`);
  }

  public updateWorkout(
    _id: string,
    updatedWorkout: Partial<Workout>
  ): Observable<Workout> {
    updatedWorkout = { ...updatedWorkout, _id };
    return this.http.patch<Workout>(`${this.apiUrl}/workout`, updatedWorkout);
  }

  public deleteWorkout(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workout/${_id}`);
  }
}
