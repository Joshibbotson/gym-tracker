import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'monthFromNumber',
})
export class MonthFromNumberPipe implements PipeTransform {
  transform(month: number): string {
    return format(new Date(month), 'LLLL');
  }
}
