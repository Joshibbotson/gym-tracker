import { Component } from '@angular/core';
import { YearComponent } from '../year/year.component';

@Component({
  selector: 'activities-view',
  standalone: true,
  imports: [YearComponent],
  templateUrl: './activities-view.component.html',
  styleUrl: './activities-view.component.scss',
})
export class ActivitiesViewComponent {}
