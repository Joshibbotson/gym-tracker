import { Component, inject, viewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateWorkoutComponent } from '../create-update-workout/create-update-workout.component';

@Component({
  selector: 'dashboard',
  imports: [CreateUpdateWorkoutComponent],
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
