import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { catchError, throwError } from 'rxjs';

const authConfigFacebook: AuthConfig = {
  loginUrl: 'https://www.facebook.com/v11.0/dialog/oauth',
  redirectUri: window.location.origin,
  clientId: '1527071504600584',
  responseType: 'token',
  scope: 'public_profile email',
  oidc: false,
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true
};

const authConfigGoogle: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: `${window.location.origin}/`,
  clientId: '1088646860176-dli8cvcdqm4ush61vft5i7u992bscdj5.apps.googleusercontent.com',
  responseType: 'token id_token',
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentProvider: 'FACEBOOK' | 'GOOGLE' = 'FACEBOOK';
  private apiUrl = 'https://backend-beatloop-nest.onrender.com/auth';

  constructor(private oauthService: OAuthService, private http: HttpClient, private route: Router) {
    this.configureGoogleAuth();
  }

  private configureFacebookAuth() {
    this.currentProvider = 'FACEBOOK';
    this.oauthService.configure(authConfigFacebook);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private configureGoogleAuth() {
    this.currentProvider = 'GOOGLE';
    this.oauthService.configure(authConfigGoogle);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginWithFacebook() {
    this.configureFacebookAuth();
    this.oauthService.initImplicitFlow();
  }

  loginWithGoogle() {
    this.configureGoogleAuth();

    // Inicia o fluxo de login com Google
    this.oauthService.initLoginFlow();
  }
  sendTokenToBackend(token: string) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/google`, { token }).pipe(
      catchError(this.handleError)
    );
  }

  handleLoginCallback() {
    this.oauthService.tryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.route.navigate(['/browse']);
      } else {
        console.error('Falha na autenticação');
      }
    }).catch((error) => {
      console.error('Erro durante o callback da autenticação:', error);
    });
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
        console.log(errorMessage)
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
