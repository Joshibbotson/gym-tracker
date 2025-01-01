import { Component, inject, viewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateWorkoutComponent } from '../create-update-workout/create-update-workout.component';
import { ActivitiesViewComponent } from '../../../activities/components/activities-view/activities-view.component';

@Component({
  selector: 'dashboard',
  imports: [CreateUpdateWorkoutComponent, ActivitiesViewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  createWorkoutConfig = viewChild('createWorkoutConfig');
  private modalService = inject(NgbModal);

  openCreateWorkoutModal() {
    this.modalService.open(this.createWorkoutConfig());
  }

  closeCreateWorkoutModal() {
    this.modalService.dismissAll();
  }
}
