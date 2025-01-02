import { Component, inject, input, signal } from '@angular/core';
import { Workout } from '../../types/Workout';
import { WorkoutService } from '../../services/workout.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'day',
  standalone: true,
  imports: [],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent {
  workout = input.required<Workout[]>();
  loading = signal<boolean>(false);
  $destroy = new Subject<void>();

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  handleWorkoutClick() {}
}
