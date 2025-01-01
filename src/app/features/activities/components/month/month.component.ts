import { Component, input } from '@angular/core';
import { MonthActivity } from '../../types/Activities';
import { DayComponent } from '../day/day.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'month',
  standalone: true,
  imports: [DayComponent, TitleCasePipe],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
})
export class MonthComponent {
  monthActivity = input.required<MonthActivity>();
}
