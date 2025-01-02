import { Injectable, signal } from '@angular/core';
import { Workout } from '../types/Workout';

@Injectable({
  providedIn: 'root',
})
export class SelectedWorkoutsService {
  private _selectedWorkouts = signal<Workout[] | undefined>(undefined);

  public get selectedWorkouts() {
    return this._selectedWorkouts();
  }
  public set selectedWorkouts(value) {
    this._selectedWorkouts.set(value);
  }
}
