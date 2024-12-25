import { Component } from '@angular/core';
import { FloatingButtonComponent } from '../floating-btn/floating-button/floating-button.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [FloatingButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
