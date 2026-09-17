import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

export interface Job {
  id?: number;
  title: string;
  description: string;
  location: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =========================
  // JOB SEEKER
  // =========================

  getAllJobs(page: number = 0, size: number = 50): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/jobseeker/jobs?page=${page}&size=${size}`
  );
}

 applyToJob(jobId: number, formData: FormData): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/jobseeker/apply/${jobId}`,
    formData,
    { responseType: 'text' }
  );
}
getMyApplications(page: number = 0, size: number = 5): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/jobseeker/applications?page=${page}&size=${size}`
  );
}

  // =========================
  // EMPLOYER
  // =========================

createJob(formData: FormData): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/employer/jobs`,
    formData
  );
}

  getEmployerJobs(page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/employer/jobs?page=${page}&size=${size}`
    ).pipe(
      map(res => res.data)
    );
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/employer/jobs/${jobId}`
    
    );
  }

  getEmployerDashboard(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/employer/dashboard`
    ).pipe(
      map(res => res.data)
    );
  }

getJobById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/jobs/${id}`);
}

updateJob(id: number, job: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/employer/jobs/${id}`, job);
}



  getApplicants(jobId: number, page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/employer/jobs/${jobId}/applicants?page=${page}&size=${size}`
    ).pipe(
      map(res => res.data)
    );
  }
}