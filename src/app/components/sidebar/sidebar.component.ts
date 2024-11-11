import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() sidebarWidthChange = new EventEmitter<string>();

  sidebarWidth: string = '230px';


  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
