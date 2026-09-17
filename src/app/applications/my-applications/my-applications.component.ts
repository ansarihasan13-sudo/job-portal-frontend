import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  applications: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(page: number = 0): void {
    this.currentPage = page;
    this.isLoading = true;
    this.errorMessage = '';

    this.jobService.getMyApplications(this.currentPage).subscribe({
      next: (pageData: any) => {
        this.applications = pageData?.content || [];
        this.totalPages = pageData?.totalPages || 0;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load applications';
        this.isLoading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadApplications(page);
    }
  }

  getPages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }
}