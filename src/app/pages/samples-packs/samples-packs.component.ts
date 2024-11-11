import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-samples-packs',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './samples-packs.component.html',
  styleUrl: './samples-packs.component.scss'
})
export class SamplesPacksComponent {

}
