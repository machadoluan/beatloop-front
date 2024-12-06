import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  imports: [
    CommonModule,
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  user: User = {} as User;
  code: string = '';
  showConfirmationCode: boolean = true;
  reenviar: boolean = false;
  timeLeft: number = 180;
  intervalId: any;

  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();
    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId);
        this.reenviar = true;
      }
    }, 1000)
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  updateCode(event: Event, nextInput: HTMLInputElement | null): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    if (!/^\d$/.test(inputValue)) {
      input.value = '';  // Limpa o campo se não for um número
      return; // Não atualiza o código
    }


    // Atualiza a variável 'codigo' concatenando os valores dos inputs
    this.code += inputValue;

    // Move o foco para o próximo input, se existir
    if (inputValue.length >= 1 && nextInput) {
      nextInput.focus();
    }
  }

  reenviarCode() {
    this.code = '';

    this.authService.reenviarCode(this.user.email).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  confirmarCodigo() {
    console.log(this.code);
    this.authService.verifyCode(this.user.email, this.code).subscribe(
      (response) => {
        this.code = '';
        this.showConfirmationCode = false;
      },
      (error) => {
        console.error(error);
        this.code = '';

      }
    )
  }



  trocarEmail() {
    this.code = '';
    this.showConfirmationCode = false;
  }

}
