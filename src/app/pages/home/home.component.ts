import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CustomSwiperComponent } from "../../components/custom-swiper/custom-swiper.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CustomSwiperComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) { }

  user: any;

  ngOnInit() {
  }

}
