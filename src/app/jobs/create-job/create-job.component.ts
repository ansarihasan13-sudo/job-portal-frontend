import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {

  jobData = {
    title: '',
    description: '',
    location: '',
    salary: 0
  };

  selectedLogo!: File;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private jobService: JobService) {}

  // Capture selected file
  onFileSelected(event: any) {
    this.selectedLogo = event.target.files[0];
  }

  createJob() {

    if (
      !this.jobData.title ||
      !this.jobData.description ||
      !this.jobData.location ||
      !this.jobData.salary
    ) {
      this.errorMessage = "All fields are required";
      return;
    }

    const formData = new FormData();

    formData.append("title", this.jobData.title);
    formData.append("description", this.jobData.description);
    formData.append("location", this.jobData.location);
    formData.append("salary", this.jobData.salary.toString());

    // add logo if selected
    if (this.selectedLogo) {
      formData.append("logo", this.selectedLogo);
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.jobService.createJob(formData).subscribe({

      next: (res) => {

        this.isLoading = false;
        this.successMessage = "Job posted successfully";

        this.jobData = {
          title: '',
          description: '',
          location: '',
          salary: 0
        };

      },

      error: (err) => {

        console.log(err);

        this.isLoading = false;
        this.errorMessage = "Error posting job";

      }

    });

  }

}