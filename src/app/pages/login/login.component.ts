import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword = false;
  loginSocial = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSocial(){
    this.loginSocial = !this.loginSocial
  }

  login() {
    this.authService.login();
  }
}
