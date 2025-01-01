import { Component } from '@angular/core';
import { ActivitiesViewComponent } from '../../../activities/components/activities-view/activities-view.component';

@Component({
  selector: 'dashboard',
  imports: [ActivitiesViewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
