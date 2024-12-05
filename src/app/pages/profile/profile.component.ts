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
    email: '',
    photo: ''
  }

  originalData = {
    id: '',
    name: '',
    email: '',
    photo: ''
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
    return this.formData.name !== this.originalData.name || this.formData.email !== this.originalData.email || this.formData.photo !== this.originalData.photo;
  }

  onCancel() {
    this.formData = { ...this.originalData };
    this.toggleBtns = false;
    this.animationClass = 'fade-out';
  }

  onSave() {
    console.log(this.formData)
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 500; // Define a largura máxima
          const maxHeight = 500; // Define a altura máxima
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            this.formData.photo = canvas.toDataURL('image/jpeg', 0.7); // Ajuste a qualidade conforme necessário
            this.toggleBtns = this.hasChanges();
            this.animationClass = this.toggleBtns ? 'fade-in' : 'fade-out';
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRemovePhoto() {
    const nameParts = this.formData.name.split(' ');
    const initials = nameParts.length > 1
      ? `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`
      : nameParts[0][0].toUpperCase();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 500;

    //Fundo da imagem
    if (ctx) {
      ctx.fillStyle = '#1A1B1D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Adicionar o nome ao centro da imagem
      ctx.font = 'bold 200px Arial'; // Estilo da fonte
      ctx.fillStyle = '#FFFFFF'; // Cor do texto
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
      this.formData.photo = canvas.toDataURL('image/png');
    }

    this.toggleBtns = this.hasChanges();
    this.animationClass = this.toggleBtns ? 'fade-in' : 'fade-out';
  }


  logout() {
    this.authService.logout()
  }

}
