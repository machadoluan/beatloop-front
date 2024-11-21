import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { catchError, throwError } from 'rxjs';

const authConfigFacebook: AuthConfig = {
  loginUrl: 'https://www.facebook.com/v11.0/dialog/oauth',
  redirectUri: window.location.origin + '/auth/callback',
  clientId: '1527071504600584',
  responseType: 'token',
  scope: 'public_profile email',
  oidc: false,
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true
};

const authConfigGoogle: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/auth/callback',
  clientId: '1088646860176-dli8cvcdqm4ush61vft5i7u992bscdj5.apps.googleusercontent.com',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentProvider: 'FACEBOOK' | 'GOOGLE' = 'FACEBOOK';

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configureFacebookAuth();
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
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  handleLoginCallback() {
    return this.oauthService.tryLogin();
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get userProfile() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  private apiUrl = 'http://localhost:3000/auth'



  login(dadosLogin: any) {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin).pipe(
      catchError(this.handleError)
    )
  }

  cadastro(dadosCadastro: any) {
    return this.http.post(`${this.apiUrl}/register`, dadosCadastro).pipe(
      catchError(this.handleError)
    )
  }

  verifyCode(email: string, code: string) {
    return this.http.post(`${this.apiUrl}/verify`, { email, code }).pipe(
      catchError(this.handleError)
    )
  }

  reenviarCode(email: string) {
    return this.http.post(`${this.apiUrl}/reenviar`, { email }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Server error message';

    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      console.error('Ocorreu um erro no cliente:', error.error.message);
    } else {
      // Erro no backend
      console.error(error.error.message);

      if (error.error.message === 'User already exists') {
        errorMessage = 'Email already exists';
      } else {
        errorMessage = 'Unknown error, please try again later';
      }
    }

    // Retorna o erro completo para o componente
    return throwError(errorMessage);
  }

}
