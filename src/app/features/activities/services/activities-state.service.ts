import { Injectable, signal } from '@angular/core';
import { YearActivity } from '../types/Activities';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesStateService {
  activites = signal<YearActivity[] | null>(null);
}
