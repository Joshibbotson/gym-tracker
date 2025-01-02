import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { YearComponent } from '../year/year.component';
import { WorkoutService } from '../../services/workout.service';
import { Subject, takeUntil } from 'rxjs';
import { YearActivity } from '../../types/Activities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateWorkoutComponent } from '../../../dashboard/components/create-update-workout/create-update-workout.component';
import { SelectedWorkoutsService } from '../../services/selected-workouts.service';

/**
 * should fetch user's activities on load
 */
@Component({
  selector: 'activities-view',
  standalone: true,
  imports: [YearComponent, CreateUpdateWorkoutComponent],
  templateUrl: './activities-view.component.html',
  styleUrl: './activities-view.component.scss',
})
export class ActivitiesViewComponent implements OnInit {
  activites = signal<YearActivity[] | null>(null);
  private readonly workoutService = inject(WorkoutService);
  private readonly selectedWorkoutsService = inject(SelectedWorkoutsService);
  private readonly modalService = inject(NgbModal);

  private readonly destroy$ = new Subject<void>();
  createWorkoutConfig = viewChild('createWorkoutConfig');

  ngOnInit(): void {
    this.fetchActivities();
  }

  handlePageRefresh(): void {
    this.fetchActivities();
    this.closeCreateWorkoutModal();
  }

  fetchActivities(): void {
    this.workoutService
      .getActivities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => this.activites.set(res),
        error: (err) => console.log('err:', err),
      });
  }

  openCreateWorkoutModal() {
    this.modalService.open(this.createWorkoutConfig());
  }

  closeCreateWorkoutModal() {
    this.modalService.dismissAll();
  }
}
