import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { JobListComponent } from './job-list.component';
import { JobService } from '../../services/job.service';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let mockJobService: any;

  beforeEach(async () => {

    mockJobService = {
      getAllJobs: jasmine.createSpy('getAllJobs').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [JobListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: JobService, useValue: mockJobService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
