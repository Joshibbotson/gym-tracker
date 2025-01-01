import { Component, input } from '@angular/core';
import { Workout } from '../../types/Workout';

@Component({
  selector: 'day',
  standalone: true,
  imports: [],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent {
  workout = input.required<Workout>();

  ngAfterViewInit(): void {
    console.log(this.workout());
  }
}
