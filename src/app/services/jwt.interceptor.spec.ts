import { TestBed } from '@angular/core/testing';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthService } from './auth.service';

describe('JwtInterceptor', () => {

  let mockAuthService: any;

  beforeEach(() => {

    mockAuthService = {
      getToken: jasmine.createSpy('getToken').and.returnValue('fake-token')
    };

    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

  });

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });

});
