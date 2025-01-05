import { Component, input } from '@angular/core';

export type TabInfo = {
  icon: string;
  title: string;
  data: number | string;
  measurement: string;
};
@Component({
  selector: 'workout-details-tab',
  imports: [],
  templateUrl: './workout-details-tab.component.html',
  styleUrl: './workout-details-tab.component.scss',
})
export class WorkoutDetailsTabComponent {
  info = input.required<TabInfo>();
}
