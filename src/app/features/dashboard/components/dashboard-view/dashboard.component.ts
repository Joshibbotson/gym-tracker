import { Component, inject, viewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateWorkoutConfigComponent } from '../create-update-workout-config/create-update-workout-config.component';

@Component({
  selector: 'dashboard',
  imports: [CreateUpdateWorkoutConfigComponent],
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
