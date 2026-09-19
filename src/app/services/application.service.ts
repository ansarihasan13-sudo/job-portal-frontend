import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'https://job-portal-backend-production-00f6.up.railway.app/api/applications';

  constructor(private http: HttpClient) {}

  // 🔥 Apply Job
  apply(jobId: number) {
    return this.http.post(
      `${this.baseUrl}/apply/${jobId}`,
      {}
    );
  }

  // 🔥 Get My Applications
  getMyApplications() {
    return this.http.get<any[]>(
      `${this.baseUrl}/my-applications`
    );
  }
}