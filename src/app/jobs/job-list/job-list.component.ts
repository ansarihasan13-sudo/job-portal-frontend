import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: any[] = [];
  allJobs: any[] = [];

  appliedJobs: number[] = [];

  isLoading = true;

  currentPage = 0;
  totalPages = 0;

  searchKeyword: string = '';

  constructor(
    private jobService: JobService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
    this.loadMyApplications();
  }

  // Load jobs
  loadJobs() {

    this.isLoading = true;

    this.jobService.getAllJobs(this.currentPage).subscribe({
      next: (res: any) => {

        this.jobs = res?.content || [];
        this.allJobs = [...this.jobs];

        this.totalPages = res?.totalPages || 0;

        this.isLoading = false;

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });

  }

  // Load applied jobs
  loadMyApplications() {

    this.jobService.getMyApplications().subscribe({
      next: (res: any) => {

        const apps = res?.content || [];
        this.appliedJobs = apps.map((app: any) => app.job.id);

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // Search jobs
  filterJobs() {

    const keyword = this.searchKeyword.toLowerCase();

    if (!keyword) {
      this.jobs = [...this.allJobs];
      return;
    }

    this.jobs = this.allJobs.filter((job: any) =>
      job.title.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    );

  }

  // Apply job
  apply(jobId: number) {

    if (!confirm("Are you sure you want to apply?")) {
      return;
    }

    const formData = new FormData(); // resume optional

    this.jobService.applyToJob(jobId, formData).subscribe({

      next: () => {

        alert("Application submitted successfully!");

        // mark as applied instantly
        this.appliedJobs.push(jobId);

      },

      error: (err) => {

        console.log(err);

        if (err?.error?.message?.includes("already")) {
          alert("You already applied to this job");
        } else {
          alert("Application failed");
        }

      }

    });

  }

  // Pagination
  changePage(page: number) {
    this.currentPage = page;
    this.loadJobs();
  }

}