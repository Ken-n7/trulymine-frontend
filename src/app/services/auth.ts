// src/app/services/auth.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

// Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    role: string;
  };
  is_active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user';

  // Angular signals for reactive state
  private userSignal = signal<User | null>(this.getUserFromStorage());
  private tokenSignal = signal<string | null>(this.getTokenFromStorage());

  // Computed properties (read-only, auto-updates)
  public currentUser = computed(() => this.userSignal());
  public isAuthenticated = computed(() => !!this.tokenSignal());
  public isAdmin = computed(() => this.userSignal()?.role.role === 'Admin');
  public isReseller = computed(() => this.userSignal()?.role.role === 'Reseller');

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login user
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    console.log('Login URL:', `${this.API_URL}/login`); // Debug
    console.log('Credentials:', credentials); // Debug

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials, { headers }).pipe(
      tap((response) => {
        console.log('Login response:', response); // Debug
        this.setSession(response);
      }),
      catchError((error) => {
        console.error('Login error:', error); // Debug
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout user
   */
  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {}).pipe(
      tap(() => {
        this.clearSession();
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        // Even if API call fails, clear local session
        this.clearSession();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get authenticated user from API
   */
  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user`).pipe(
      tap((user) => {
        this.userSignal.set(user);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      })
    );
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.tokenSignal();
  }

  /**
   * Store auth session
   */
  private setSession(authResult: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    this.tokenSignal.set(authResult.access_token);
    this.userSignal.set(authResult.user);
  }

  /**
   * Clear auth session
   */
  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  /**
   * Get token from localStorage
   */
  private getTokenFromStorage(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get user from localStorage
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }
}
