import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';


export interface Job {
  id: number | string;
  title: string;
  department: string;
  location: string;
  description: string;
  active: boolean;
}

interface JobsResponse {
  jobs: Job[];
}

@Injectable({
  providedIn: 'root'
})
export class Career {
  private http = inject(HttpClient);

  private readonly apiUrl =
    environment.apiUrl + '?route=jobs';

  getActiveJobs(): Observable<Job[]> {
    return this.http.get<JobsResponse>(this.apiUrl).pipe(
      map((res) => res.jobs ?? [])
    );
  }
}
