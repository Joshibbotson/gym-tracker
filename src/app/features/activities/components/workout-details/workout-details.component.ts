import {
  Component,
  HostListener,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Workout } from '../../types/Workout';
import { DatePipe } from '@angular/common';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';
import { WorkoutDetailsTabComponent } from '../workout-details-tab/workout-details-tab.component';
import { WorkoutService } from '../../services/workout.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateWorkoutComponent } from '../../../dashboard/components/create-update-workout/create-update-workout.component';
import { ActivitiesStateService } from '../../services/activities-state.service';

@Component({
  selector: 'workout-details',
  imports: [DatePipe, WorkoutDetailsTabComponent, CreateUpdateWorkoutComponent],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent {
  workoutToEdit = signal<Workout | null>(null);
  workouts = input.required<Workout[]>();
  reloadPage = output<string>();
  selectedWorkoutsService = inject(SelectedWorkoutsService);
  workoutService = inject(WorkoutService);
  private readonly modalService = inject(NgbModal);
  private readonly activitiesStateService = inject(ActivitiesStateService);

  editWorkoutConfig = viewChild('editWorkoutConfig');

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

  handleEditWorkout(workout: Workout): void {
    console.log('called');
    this.workoutToEdit.set(workout);
    this.openEditWorkoutModal();
  }

  handleDeleteWorkout(_id: string): void {
    this.workoutService
      .deleteWorkout(_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.reloadPage.emit(_id),
        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
  }

  handlePageRefresh(): void {
    this.fetchActivities();
    this.closeEditWorkoutModal();
  }

  fetchActivities(): void {
    this.workoutService
      .getActivities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.activitiesStateService.activites.set(res);
        },
        error: (err) => console.log('err:', err),
      });
  }

  openEditWorkoutModal() {
    this.modalService.open(this.editWorkoutConfig());
  }

  closeEditWorkoutModal() {
    this.modalService.dismissAll();
  }
}
