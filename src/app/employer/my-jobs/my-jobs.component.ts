import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  jobs: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(page: number = 0): void {
    this.currentPage = page;
    this.isLoading = true;
    this.errorMessage = '';

    this.jobService.getEmployerJobs(this.currentPage).subscribe({
      next: (pageData: any) => {
        this.jobs = pageData?.content || [];
        this.totalPages = pageData?.totalPages || 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Load jobs error:', error);
        this.errorMessage = 'Failed to load jobs';
        this.isLoading = false;
      }
    });
  }

  // 🔴 DELETE JOB
  deleteJob(jobId: number): void {

    const confirmDelete = confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) {
      return;
    }

    this.jobService.deleteJob(jobId).subscribe({
      next: () => {

        alert("Job deleted successfully");

        // refresh jobs
        this.loadJobs(this.currentPage);

      },
      error: (error) => {
        console.error("Delete job error:", error);
        alert("Failed to delete job");
      }
    });

  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadJobs(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadJobs(this.currentPage - 1);
    }
  }
}