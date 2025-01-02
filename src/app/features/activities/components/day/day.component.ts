import { Component, inject, input } from '@angular/core';
import { Workout } from '../../types/Workout';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';

@Component({
  selector: 'day',
  standalone: true,
  imports: [],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent {
  workouts = input.required<Workout[]>();
  selectedWorkoutsService = inject(SelectedWorkoutsService);

  handleWorkoutClick() {
    this.selectedWorkoutsService.selectedWorkouts = this.workouts();

    console.log(this.selectedWorkoutsService.selectedWorkouts);
  }
}
