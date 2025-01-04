import { Component, HostListener, inject, input } from '@angular/core';
import { Workout } from '../../types/Workout';
import { DatePipe } from '@angular/common';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';

@Component({
  selector: 'workout-details',
  imports: [DatePipe],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent {
  selectedWorkoutsService = inject(SelectedWorkoutsService);
  @HostListener('window:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id !== 'workout-details' && target.id !== 'active-day') {
      this.selectedWorkoutsService.selectedWorkouts = undefined;
    }
  }
  workouts = input.required<Workout[]>();
}
