import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CreateJobComponent } from './create-job.component';
import { JobService } from '../../services/job.service';

describe('CreateJobComponent', () => {
  let component: CreateJobComponent;
  let fixture: ComponentFixture<CreateJobComponent>;
  let mockJobService: any;

  beforeEach(async () => {

    mockJobService = {
      createJob: jasmine.createSpy('createJob').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [CreateJobComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: JobService, useValue: mockJobService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
