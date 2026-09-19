import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'https://job-portal-backend-production-00f6.up.railway.app/api/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(page: number = 0): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/users?page=${page}&size=5`
    ).pipe(
      map(res => res.data)
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/users/${userId}`
    ).pipe(
      map(res => res.data)
    );
  }

  getAllJobs(page: number = 0): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/jobs?page=${page}&size=5`
    ).pipe(
      map(res => res.data)
    );
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/jobs/${jobId}`
    ).pipe(
      map(res => res.data)
    );
  }
}