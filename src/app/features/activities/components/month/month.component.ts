import { Component, input } from '@angular/core';
import { MonthActivity } from '../../types/Activities';
import { DayComponent } from '../day/day.component';
import { TitleCasePipe } from '@angular/common';
import { MonthFromNumberPipe } from '../../../../core/pipes/month-from-number.pipe';

@Component({
  selector: 'month',
  standalone: true,
  imports: [DayComponent, MonthFromNumberPipe],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
})
export class MonthComponent {
  monthActivity = input.required<MonthActivity>();
}
