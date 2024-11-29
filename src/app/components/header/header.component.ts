import { Component, inject, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebarService = inject(SidebarService);
  showSearchSuggestions: boolean = false;
  user: any;

  constructor(
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();
    console.log(this.user)
  }

  // Mostrar sugestões quando o input receber foco
  onFocus() {
    this.showSearchSuggestions = true;
  }

  // Esconder sugestões quando clicar fora
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchElement = (event.target as HTMLElement).closest('.search');
    if (!searchElement) {
      this.showSearchSuggestions = false;
    }
  }
}
