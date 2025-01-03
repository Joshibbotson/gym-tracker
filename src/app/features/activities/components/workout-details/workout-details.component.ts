import { Component, inject, input } from '@angular/core';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';
import { Workout } from '../../types/Workout';

@Component({
  selector: 'workout-details',
  imports: [],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent {
  workouts = input.required<Workout[]>();
}
