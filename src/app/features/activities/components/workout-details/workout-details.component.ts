import { Component, HostListener, inject, input, output } from '@angular/core';
import { Workout } from '../../types/Workout';
import { DatePipe } from '@angular/common';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';
import { WorkoutDetailsTabComponent } from '../workout-details-tab/workout-details-tab.component';
import { WorkoutService } from '../../services/workout.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'workout-details',
  imports: [DatePipe, WorkoutDetailsTabComponent],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent {
  workouts = input.required<Workout[]>();
  reloadPage = output<string>();
  selectedWorkoutsService = inject(SelectedWorkoutsService);
  workoutService = inject(WorkoutService);
  destroy$ = new Subject<void>();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeWorkoutDetails() {
    this.selectedWorkoutsService.selectedWorkouts = undefined;
  }

  handleDeleteWorkout(_id: string) {
    this.workoutService
      .deleteWorkout(_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.reloadPage.emit(_id),
        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
  }
}
