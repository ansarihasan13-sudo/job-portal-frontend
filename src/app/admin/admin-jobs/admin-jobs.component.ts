import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  jobs: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(page: number = 0): void {
    this.currentPage = page;
    this.isLoading = true;

    this.adminService.getAllJobs(this.currentPage).subscribe({
      next: (data) => {
        this.jobs = data.content;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load jobs';
        this.isLoading = false;
      }
    });
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.adminService.deleteJob(jobId).subscribe(() => {
        this.loadJobs(this.currentPage);
      });
    }
  }
}
