import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  private readonly apiUrl: string = 'http://localhost:8888';
  private readonly http = inject(HttpClient);
}
