import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginData = {
email: '',
password: ''
};

errorMessage: string = '';
isLoading: boolean = false;

constructor(
private authService: AuthService,
private router: Router
) {}

login(): void {


if (!this.loginData.email || !this.loginData.password) {
  this.errorMessage = "Please fill all fields";
  return;
}

this.isLoading = true;
this.errorMessage = '';

this.authService.login(this.loginData).subscribe({

  next: (res: any) => {

    // Save token, email and role
    this.authService.saveAuthData(res);

    this.isLoading = false;

     const role = res.role;

    // Redirect based on role
    if (role === 'ADMIN') {
      this.router.navigate(['/admin/jobs']);
    } 
    else if (role === 'JOB_SEEKER') {
      this.router.navigate(['/jobs']);
    } 
    else if (role === 'EMPLOYER') {
      this.router.navigate(['/employer']);
    } 
    else {
      this.router.navigate(['/login']);
    }

  },

  error: () => {
    this.isLoading = false;
    this.errorMessage = "Invalid email or password";
  }

});


}
}
