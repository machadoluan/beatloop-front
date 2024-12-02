import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  user: any;
  animationClass: string = '';
  toggleBtns: boolean = false

  formData = {
    id: '',
    name: '',
    email: ''
  }

  originalData = {
    id: '',
    name: '',
    email: ''
  }


  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();

    this.formData = { ...this.user };
    this.originalData = { ...this.user };
  }

  onInputChange() {
    this.toggleBtns = this.hasChanges();
    this.animationClass = this.toggleBtns ? 'fade-in' : 'fade-out';
  }

  private hasChanges(): boolean {
    return this.formData.name !== this.originalData.name || this.formData.email !== this.originalData.email;
  }

  onCancel() {
    this.formData = { ...this.originalData };
    this.toggleBtns = false;
    this.animationClass = 'fade-out';
  }

  onSave() {
    this.authService.updateProfile(this.formData).subscribe(
      (response) => {
        localStorage.setItem('token', response.accessToken);

        this.user = this.authService.getUserFromToken();
        this.originalData = { ...this.user };
        this.toggleBtns = false;
        this.animationClass = 'fade-out';
      },
      (error) => {
        console.log(error)
      })
  }


  logout() {
    this.authService.logout()
  }

}
