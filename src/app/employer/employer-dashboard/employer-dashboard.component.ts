import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {

  totalJobs: number = 0;
  totalApplications: number = 0;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobService.getEmployerDashboard().subscribe({
      next: (data: any) => {
        this.totalJobs = data?.totalJobs || 0;
        this.totalApplications = data?.totalApplications || 0;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}