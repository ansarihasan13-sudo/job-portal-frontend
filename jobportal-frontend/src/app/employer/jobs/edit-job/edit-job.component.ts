import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/job.service';
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  jobId!: number;

  job = {
    title: '',
    description: '',
    location: '',
    salary: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    // URL se job id lo
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadJob();
  }

  loadJob() {

    this.jobService.getJobById(this.jobId).subscribe({

      next: (res:any) => {

        // backend ApiResponse me data aata hai
        this.job = res.data;

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  updateJob() {

    this.jobService.updateJob(this.jobId, this.job).subscribe({

      next: () => {

        alert("Job updated successfully");

        this.router.navigate(['/employer/my-jobs']);

      },

      error: (err) => {

        console.error(err);

        alert("Update failed");

      }

    });

  }

}