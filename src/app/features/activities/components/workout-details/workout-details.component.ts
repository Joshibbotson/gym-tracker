import { Component, inject } from '@angular/core';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';

@Component({
  selector: 'workout-details',
  imports: [],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent {
  selectedWorkoutsService = inject(SelectedWorkoutsService);
}
