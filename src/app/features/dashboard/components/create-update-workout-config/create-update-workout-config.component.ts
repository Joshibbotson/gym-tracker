import { Component, input } from '@angular/core';

export type WorkoutConfig

@Component({
  selector: 'create-update-workout-config',
  imports: [],
  templateUrl: './create-update-workout-config.component.html',
  styleUrl: './create-update-workout-config.component.scss'
})
export class CreateUpdateWorkoutConfigComponent {

  workoutConfigToEdit = input<any>()

}
