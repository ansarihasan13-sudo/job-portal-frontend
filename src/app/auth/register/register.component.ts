import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
registerData = {
  name: '',
  email: '',
  password: '',
  role: '' 
};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration Failed');
      }
    });
  }
}