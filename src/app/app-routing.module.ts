import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { JobListComponent } from './jobs/job-list/job-list.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { EditJobComponent } from './employer/jobs/edit-job/edit-job.component';

import { MyApplicationsComponent } from './applications/my-applications/my-applications.component';
import { JobApplicationsComponent } from './applications/job-applications/job-applications.component';

import { EmployerDashboardComponent } from './employer/employer-dashboard/employer-dashboard.component';
import { MyJobsComponent } from './employer/my-jobs/my-jobs.component';

import { AdminJobsComponent } from './admin/admin-jobs/admin-jobs.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [

  // ========================
  // DEFAULT
  // ========================
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ========================
  // PUBLIC ROUTES
  // ========================
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ========================
  // JOB SEEKER ROUTES
  // ========================
  {
    path: 'jobs',
    component: JobListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'JOB_SEEKER' }
  },
  {
    path: 'my-applications',
    component: MyApplicationsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'JOB_SEEKER' }
  },

  // ========================
  // EMPLOYER ROUTES
  // ========================
  {
    path: 'employer',
    component: EmployerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'EMPLOYER' }
  },
  {
    path: 'employer/my-jobs',
    component: MyJobsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'EMPLOYER' }
  },
  {
    path: 'employer/create-job',
    component: CreateJobComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'EMPLOYER' }
  },
  {
    path: 'employer/edit-job/:id',
    component: EditJobComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'EMPLOYER' }
  },
  {
    path: 'employer/applications/:jobId',
    component: JobApplicationsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'EMPLOYER' }
  },

  // ========================
  // ADMIN ROUTES
  // ========================
  {
    path: 'admin/jobs',
    component: AdminJobsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },

  // ========================
  // FALLBACK
  // ========================
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }