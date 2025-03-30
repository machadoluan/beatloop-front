import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'

  constructor(private http: HttpClient, private route: Router) {

  }

  loginWithFacebook() {
  }

  loginWithGoogle() {
  }

  login(dadosLogin: any) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, dadosLogin).pipe(
      catchError(this.handleError)
    );
  }

  cadastro(dadosCadastro: any) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/register`, dadosCadastro).pipe(
      catchError(this.handleError)
    );
  }

  verifyCode(email: string, code: string) {
    return this.http.post(`${this.apiUrl}/verify`, { email, code }).pipe(
      catchError(this.handleError)
    );
  }

  reenviarCode(email: string) {
    return this.http.post(`${this.apiUrl}/reenviar`, { email }).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(data: any) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/update`, data).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Server error';

    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      console.error('Ocorreu um erro no cliente:', error.error.message);
    } else {
      // Erro no backend
      console.error(error.error);

      if (error.error.message === 'User already exists') {
        errorMessage = 'Email already exists';
      } else {
        errorMessage = error.error.message;
        console.log(error)
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  getUserFromToken(): any | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      return decodedPayload;
    }
    return null;
  }

  isAuthenticado(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

  verify(): boolean {
    const user = this.getUserFromToken();
    return user?.verify ?? false;
  }
}
