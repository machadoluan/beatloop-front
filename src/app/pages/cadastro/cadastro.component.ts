import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  showPassword = false;
  password = '';
  passwordStrengthClass = '';
  passwordStrengthText = '';
  passwordCriteria = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  };

  constructor() {}

  checkPasswordStrength(password: string) {
    // Verifica cada critério
    this.passwordCriteria = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Conta quantos critérios foram atendidos
    const criteriaCount = Object.values(this.passwordCriteria).filter(value => value).length;

    // Define a força baseada nos critérios atendidos
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

  onPasswordChange(event: any) {
    const password = event.target.value;
    this.password = password;
    this.checkPasswordStrength(password);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
