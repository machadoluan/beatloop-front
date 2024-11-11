import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
