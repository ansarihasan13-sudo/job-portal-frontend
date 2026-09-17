import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Auth Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Job Components
import { JobListComponent } from './jobs/job-list/job-list.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';

// Application Components
import { MyApplicationsComponent } from './applications/my-applications/my-applications.component';
import { JobApplicationsComponent } from './applications/job-applications/job-applications.component';

// Interceptor
import { JwtInterceptor } from './services/jwt.interceptor';
import { EmployerDashboardComponent } from './employer/employer-dashboard/employer-dashboard.component';
import { MyJobsComponent } from './employer/my-jobs/my-jobs.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminJobsComponent } from './admin/admin-jobs/admin-jobs.component';
import { EditJobComponent } from './employer/jobs/edit-job/edit-job.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    JobListComponent,
    CreateJobComponent,
    MyApplicationsComponent,
    JobApplicationsComponent,
    EmployerDashboardComponent,
    MyJobsComponent,
    AdminUsersComponent,
    AdminJobsComponent,
    EditJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
