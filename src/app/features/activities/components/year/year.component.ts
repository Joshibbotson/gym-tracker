import { Component, input } from '@angular/core';
import { MonthComponent } from '../month/month.component';
import { YearActivity } from '../../types/Activities';

@Component({
  selector: 'year',
  standalone: true,
  imports: [MonthComponent],
  templateUrl: './year.component.html',
  styleUrl: './year.component.scss',
})
export class YearComponent {
  YearActivity = input.required<YearActivity>();
}
