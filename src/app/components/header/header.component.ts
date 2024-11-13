import { Component, inject, HostListener } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sidebarService = inject(SidebarService);
  showSearchSuggestions: boolean = false;

  constructor() {}

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
