import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);

  sidebarWidth: string = '80px';
  descButton: boolean = false;
  iconSlide: boolean = false;
  isOpen$: Observable<boolean>;

  @Output() sidebarWidthChange = new EventEmitter<string>();

  constructor(private router: Router) {
    this.isOpen$ = this.sidebarService.isOpen$;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  get isDescVisible(): Observable<boolean> {
    return this.isOpen$.pipe(map(isOpen => this.descButton || isOpen));
  }


  toggleSlideBar() {
    this.sidebarWidth = this.sidebarWidth === "80px" ? "200px" : "80px"
    this.descButton = !this.descButton
    this.iconSlide = !this.iconSlide
    this.sidebarWidthChange.emit(this.sidebarWidth);
  }

}
