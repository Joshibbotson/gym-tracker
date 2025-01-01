import { Component, inject, OnInit, signal } from '@angular/core';
import { YearComponent } from '../year/year.component';
import { Activities } from '../../types/Activities';
import { WorkoutService } from '../../services/workout.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * should fetch user's activities on load
 */
@Component({
  selector: 'activities-view',
  standalone: true,
  imports: [YearComponent],
  templateUrl: './activities-view.component.html',
  styleUrl: './activities-view.component.scss',
})
export class ActivitiesViewComponent implements OnInit {
  activites = signal<Activities | null>(null);
  private readonly workoutService = inject(WorkoutService);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.fetchActivities();
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
}
