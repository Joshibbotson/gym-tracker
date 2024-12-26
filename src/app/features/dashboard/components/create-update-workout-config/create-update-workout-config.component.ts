import { Component, input } from '@angular/core';
import { Workout } from '../../../activities/types/Workout';

@Component({
  selector: 'create-update-workout-config',
  imports: [],
  templateUrl: './create-update-workout-config.component.html',
  styleUrl: './create-update-workout-config.component.scss',
})
export class CreateUpdateWorkoutConfigComponent {
  workoutConfigToEdit = input<Workout>();
}
