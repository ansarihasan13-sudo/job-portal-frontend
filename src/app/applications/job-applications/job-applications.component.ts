import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {

  applications: any[] = [];
  jobId!: number;
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.loadApplicants();
  }

  loadApplicants(page: number = 0): void {
    this.currentPage = page;
    this.isLoading = true;

    this.jobService.getApplicants(this.jobId, this.currentPage).subscribe({
      next: (data: any) => {
        this.applications = data?.content || [];
        this.totalPages = data?.totalPages || 0;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load applicants';
        this.isLoading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadApplicants(page);
    }
  }

  getPages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }
}