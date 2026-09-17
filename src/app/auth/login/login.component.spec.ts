import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;

  beforeEach(() => {

    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({ token: 'fake-token' })),
      saveToken: jasmine.createSpy('saveToken')
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method', () => {
    component.loginData = {
      email: 'test@test.com',
      password: '123456'
    };

    component.login();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockAuthService.saveToken).toHaveBeenCalledWith('fake-token');
  });

});
