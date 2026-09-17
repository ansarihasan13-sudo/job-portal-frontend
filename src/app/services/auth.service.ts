import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthData {
token: string;
email: string;
role: string;
}

interface ApiResponse<T> {
timestamp: string;
status: number;
message: string;
data: T;
}

@Injectable({
providedIn: 'root'
})
export class AuthService {

private baseUrl = `${environment.apiUrl}/auth`;

constructor(private http: HttpClient) {}

// 🔐 LOGIN
login(data: any): Observable<AuthData> {
return this.http.post<ApiResponse<AuthData>>(
`${this.baseUrl}/login`,
data
).pipe(
map(response => response.data)
);
}

// 📝 REGISTER
register(data: any): Observable<string> {
return this.http.post<ApiResponse<string>>(
`${this.baseUrl}/register`,
data
).pipe(
map(response => response.message)
);
}

// 💾 SAVE AUTH DATA
saveAuthData(data: AuthData): void {
localStorage.setItem('token', data.token);
localStorage.setItem('email', data.email);
localStorage.setItem('role', data.role);
}

// 🔍 GET TOKEN
getToken(): string | null {
return localStorage.getItem('token');
}

// 🔍 GET ROLE
getRole(): string | null {
return localStorage.getItem('role');
}

// 🔍 GET EMAIL
getEmail(): string | null {
return localStorage.getItem('email');
}

// 🔐 CHECK LOGIN
isLoggedIn(): boolean {
return !!localStorage.getItem('token');
}

// 🚪 LOGOUT
logout(): void {
localStorage.clear();
}
}
