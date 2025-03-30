import { Component, inject, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebarService = inject(SidebarService);
  showSearchSuggestions: boolean = false;
  user: any;
  isMenuOpen: boolean = true;
  profileDropdonw: boolean = false
  animationClass: string = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeDropdown();
      }
    });
  }


  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you really want to log out?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-sign-out',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.authService.logout();
      },
    });
  }


  btnToggle() {
    if (this.isMenuOpen) {
      this.sidebarService.open()
    } else {
      this.sidebarService.close()
    }
    this.isMenuOpen = !this.isMenuOpen;
  }


  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();
    console.log(this.user)
  }

  toggleDropdown() {
    if (this.profileDropdonw) {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.profileDropdonw = !this.profileDropdonw;
        this.animationClass = 'fade-in';
      }, 200); // Tempo da animação em ms
    } else {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.profileDropdonw = !this.profileDropdonw;
        this.animationClass = 'fade-in';
      }, 200);
    }
  }

  closeDropdown() {
    this.animationClass = 'fade-out';
    setTimeout(() => {
      this.profileDropdonw = false;
      this.animationClass = 'fade-in';
    }, 200);
  }

  // Fecha o dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdownElement = document.querySelector('.profile-dropdown');
    if (this.profileDropdonw && dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }
}
