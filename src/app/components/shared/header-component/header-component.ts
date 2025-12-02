import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { HttpClient } from '@angular/common/http'; // ← Add this
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css'],
})
export class HeaderComponent {
  // Inject services at the top
  private router = inject(Router);
  private authService = inject(AuthService);
  private http = inject(HttpClient); // ← Add this for testing

  isHomePage = false;
  showLoginModal = false;

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  // Now you can safely use authService
  loggedIn = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;
  isAdmin = this.authService.isAdmin;

  constructor() {
    this.checkRoute();
    this.router.events.subscribe(() => this.checkRoute());
  }

  checkRoute() {
    this.isHomePage = this.router.url === '/';
  }

  openLoginModal() {
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
  }

  login() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.closeLoginModal();

        // Navigate based on role
        if (response.user.role.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 422 || err.status === 401) {
          this.errorMessage = 'Invalid credentials, please try again.';
        } else {
          this.errorMessage = 'Login failed. Please check your connection.';
        }
      },
    });
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe();
    }
  }


    testHttp() {
    console.log('Testing if HttpClient works...');
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe({
      next: (data) => console.log('HttpClient WORKS:', data),
      error: (err) => console.error('HttpClient ERROR:', err)
    });
  }
}
