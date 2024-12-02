import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>Processando login...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(private oauthService: OAuthService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.handleAuthentication();
  }

  private async handleAuthentication() {
    try {
      await this.authService.handleLoginCallback();

      // Após o sucesso do login, o idToken estará disponível
      const idToken = this.oauthService.getIdToken();
      const accessToken = this.oauthService.getAccessToken();

      // Verifica se o idToken ou accessToken foram obtidos com sucesso
      if (idToken || accessToken) {
        console.log('ID Token ou Access Token obtido:', idToken || accessToken);

        // Envia o token para o backend para validar e criar a sessão do usuário
        this.authService.sendTokenToBackend(idToken || accessToken).subscribe(
          (response) => {
            console.log('Token enviado com sucesso para o backend:', response);

            // Armazene o token e os dados do usuário em localStorage ou sessionStorage
            localStorage.setItem('token', response.accessToken);

            // Navega para a página inicial após o sucesso
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Erro ao enviar token para o backend:', error);
            this.router.navigate(['/login']);
          }
        );
      } else {
        console.error('Token de acesso ou ID token não encontrado');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      this.router.navigate(['/login']);
    }
  }
}
