import { Component } from '@angular/core';
import { MonthComponent } from '../month/month.component';

@Component({
  selector: 'year',
  standalone: true,
  imports: [MonthComponent],
  templateUrl: './year.component.html',
  styleUrl: './year.component.scss',
})
export class YearComponent {
  readonly year = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
}
