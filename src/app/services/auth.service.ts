import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { authConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

interface UserInfo {
  sub: string;
  email: string;
  name: string;
  picture: string;
  // adicione outros campos que você precisa
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.configureOAuth();
  }

  private apiUrl = 'http://localhost:3000/api/v1/auth'

  private configureOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLoginCodeFlow().then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.saveUserInfo();
          this.router.navigate(['/']);
        }
      });
    });

    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.saveUserInfo();
        this.router.navigate(['/']);
      }
    });
  }

  private saveUserInfo() {
    this.oauthService.loadUserProfile().then((userProfile: any) => {
      const userInfo: UserInfo = {
        sub: userProfile.sub,
        email: userProfile.email,
        name: userProfile.name,
        picture: userProfile.picture
      };

      localStorage.setItem('access_token', this.oauthService.getAccessToken());
      localStorage.setItem('user_info', JSON.stringify(userInfo));
    });
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken() && !!localStorage.getItem('access_token');
  }

  getUserInfo(): UserInfo | null {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  entrar(dadosLogin: any) {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin);
  }

  userLogin(dadosLogin: any) {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin);
  }

  cadastro(dadosCadastro: any) {
    return this.http.post(`${this.apiUrl}/register`, dadosCadastro);
  }

}
