import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 0): void {
    this.currentPage = page;
    this.isLoading = true;

    this.adminService.getAllUsers(this.currentPage).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe(() => {
        this.loadUsers(this.currentPage);
      });
    }
  }
}