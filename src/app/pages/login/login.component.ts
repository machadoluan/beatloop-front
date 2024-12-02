import { Component, ElementRef, Injectable, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root', // Certifique-se que o AuthService é fornecido na raiz
})
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChildren('inputRef') inputs!: QueryList<ElementRef>;

  showPassword = false;
  loginSocial = true;
  animationClass: string = '';
  isVerifying = false;
  userLoginForm: FormGroup;
  code: string = '';
  messageError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private oauthService: OAuthService
  ) {
    this.userLoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSocial() {
    if (this.loginSocial) {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.loginSocial = !this.loginSocial;
        this.animationClass = 'fade-in';
      }, 500); // Tempo da animação em ms
    } else {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.loginSocial = !this.loginSocial;
        this.animationClass = 'fade-in';
      }, 500);
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  updateCode(event: Event, currentIndex: number): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Limpa o valor se não for um número
    if (!/^\d$/.test(inputValue) && inputValue !== '') {
      input.value = '';
      return;
    }

    // Atualiza o foco para o próximo input, se necessário
    const inputsArray = this.inputs.toArray();
    if (inputValue.length >= 1 && currentIndex < inputsArray.length - 1) {
      inputsArray[currentIndex + 1].nativeElement.focus();
    }

    // Reconstrói o código com os valores atuais dos inputs
    this.code = inputsArray.map(el => el.nativeElement.value).join('');
  }


  userLogin() {
    this.authService.login(this.userLoginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/browse']);
      },
      (error) => {
        this.messageError = error;
      }
    )
  }

  reenviarCode() {
    this.code = '';

    this.authService.reenviarCode(this.userLoginForm.value.email).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  confirmarCodigo() {
    this.authService.verifyCode(this.userLoginForm.value.email, this.code).subscribe(
      (response) => {
        console.log(response)
        this.code = '';
        this.router.navigate(['/browse']);
      },
      (error) => {
        console.error(error);
        this.code = '';

      }
    )
  }
}
