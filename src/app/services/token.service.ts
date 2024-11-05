import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private oauthService: OAuthService) {}

  getToken(): string | null {
    return this.oauthService.getAccessToken();
  }

  hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
} 
