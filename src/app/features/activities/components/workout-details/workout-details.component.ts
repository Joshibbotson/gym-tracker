import { Component, HostListener, inject, input } from '@angular/core';
import { Workout } from '../../types/Workout';
import { DatePipe } from '@angular/common';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';
import { WorkoutDetailsTabComponent } from '../workout-details-tab/workout-details-tab.component';

@Component({
  selector: 'workout-details',
  imports: [DatePipe, WorkoutDetailsTabComponent],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent {
  selectedWorkoutsService = inject(SelectedWorkoutsService);
  @HostListener('window:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const workoutDetailsElement = document.getElementById('workout-details');

    if (
      workoutDetailsElement &&
      !workoutDetailsElement.contains(target) &&
      target.id !== 'active-day'
    ) {
      this.selectedWorkoutsService.selectedWorkouts = undefined;
    }
  }

  workouts = input.required<Workout[]>();

  closeWorkoutDetails() {
    this.selectedWorkoutsService.selectedWorkouts = undefined;
  }
}
