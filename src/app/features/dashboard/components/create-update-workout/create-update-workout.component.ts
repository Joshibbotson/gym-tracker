import { Component, input } from '@angular/core';
import { Workout } from '../../../activities/types/Workout';

@Component({
  selector: 'create-update-workout',
  imports: [],
  templateUrl: './create-update-workout.component.html',
  styleUrl: './create-update-workout.component.scss',
})
export class CreateUpdateWorkoutComponent {
  workoutToEdit = input<Workout>();
}
