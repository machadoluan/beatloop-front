import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,   // Corrigido: Usando CommonModule
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    VerifyEmailComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CadastroComponent {

  // Controla a exibição do formulário de login social
  loginSocial = true;
  // Controla a visibilidade da senha
  showPassword = false;
  // Controla a visibilidade da confirmação de senha
  showConfirmPassword = false;
  password = '';
  confirmPassword = '';
  showConfirmationCode: boolean = false;
  code: string = '';

  // Objeto que armazena os valores dos campos do formulário

  // Classes e texto para indicar visualmente a força da senha
  passwordStrengthClass = '';
  passwordStrengthText = '';
  errorEmail: string = '';
  otherError: string = '';

  // Objeto que controla os critérios de validação da senha
  passwordCriteria = {
    minLength: false,      // Mínimo de 8 caracteres
    hasUpperCase: false,   // Contém letra maiúscula
    hasLowerCase: false,   // Contém letra minúscula
    hasNumber: false,      // Contém número
    hasSpecialChar: false  // Contém caractere especial
  };
  animationClass: string = '';

  // Formulário reativo do Angular
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicialização do formulário com validações
    this.cadastroForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Campo obrigatório e mínimo de 3 caracteres
      email: ['', [Validators.required, Validators.email]], // Campo obrigatório e formato de email válido
      password: ['', [Validators.required, this.passwordStrengthValidator()]], // Campo obrigatório e validação personalizada
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator // Validação para comparar as senhas
    });
  }

  // Validador personalizado para verificar a força da senha
  passwordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      // Verifica todos os critérios de força da senha
      const criteria = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      };

      // Conta quantos critérios foram atendidos
      const criteriaCount = Object.values(criteria).filter(value => value).length;

      // Retorna erro se não atender todos os critérios
      return criteriaCount === 5 ? null : { weakPassword: true };
    };
  }

  // Método para verificar e atualizar a força da senha em tempo real
  checkPasswordStrength(password: string) {
    // Atualiza o status de cada critério
    this.passwordCriteria = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Conta critérios atendidos
    const criteriaCount = Object.values(this.passwordCriteria).filter(value => value).length;

    // Define a classe e texto de força com base nos critérios atendidos
    if (password === '') {
      this.passwordStrengthClass = '';
      this.passwordStrengthText = '';
    } else if (criteriaCount <= 2) {
      this.passwordStrengthClass = 'weak';
      this.passwordStrengthText = 'Fraca';
    } else if (criteriaCount <= 4) {
      this.passwordStrengthClass = 'medium';
      this.passwordStrengthText = 'Média';
    } else {
      this.passwordStrengthClass = 'strong';
      this.passwordStrengthText = 'Forte';
    }
  }

  // Retorna array com os critérios que ainda não foram atendidos
  getMissingCriteriaText(): string[] {
    const missing: string[] = [];

    if (!this.passwordCriteria.minLength) {
      missing.push('Mínimo de 8 caracteres');
    }
    if (!this.passwordCriteria.hasUpperCase) {
      missing.push('Uma letra maiúscula');
    }
    if (!this.passwordCriteria.hasLowerCase) {
      missing.push('Uma letra minúscula');
    }
    if (!this.passwordCriteria.hasNumber) {
      missing.push('Um número');
    }
    if (!this.passwordCriteria.hasSpecialChar) {
      missing.push('Um caractere especial');
    }
    return missing;
  }

  // Manipula mudanças no campo de senha
  onPasswordChange(event: any) {
    const password = event.target.value;
    this.password = password;
    this.checkPasswordStrength(password);
  }

  // Manipula mudanças no campo de confirmação de senha
  onConfirmPasswordChange(event: any) {
    const confirmPassword = event.target.value;
    this.confirmPassword = confirmPassword;
  }

  // Alterna visibilidade da senha
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Alterna visibilidade da confirmação de senha
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Alterna entre login social e formulário normal, limpando os campos de senha


  // Validador personalizado para verificar se as senhas coincidem
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Retorna erro se as senhas não coincidirem
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  cadastrar() {
    this.errorEmail = '';
    this.otherError = '';

    this.authService.cadastro(this.cadastroForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.accessToken);
        this.showConfirmationCode = true;
        this.errorEmail = '';
        this.otherError = '';
      },
      (error) => {
        if (error = 'Email already exists') {
          this.errorEmail = 'Email already exists';
        } else {
          this.otherError = error
        }
      }
    )
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
      this.cadastroForm.reset()

    }
  }





  trocarEmail() {
    this.code = '';
    this.showConfirmationCode = false;
  }
}
