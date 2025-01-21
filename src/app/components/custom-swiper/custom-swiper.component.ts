import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Banner } from '../../models/interface';
import { SwiperOptions } from 'swiper/types';

register();

@Component({
  selector: 'app-custom-swiper',
  imports: [CommonModule],
  templateUrl: './custom-swiper.component.html',
  styleUrl: './custom-swiper.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomSwiperComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);

  banners: Banner[] = [
    {
      imageUrl: '/img/banner1.jpg',
      title: 'Os Melhores Samples de Funk para Download',
    },
    {
      imageUrl: '/img/banner2.jpg',
      title: 'Pacote Exclusivo de Samples para Trap',
    },
    {
      imageUrl: '/img/banner3.jpg',
      title: 'Samples Profissionais para Música Eletrônica',
    },
    {
      imageUrl: '/img/banner4.jpg',
      title: 'Loops e Samples para Hip Hop Nacional',
    }
  ];

  activeIndex: number = 0; // Índice do slide ativo

  swiperOptions: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on: {
      activeIndexChange: (swiper: any) => {
        this.activeIndex = swiper.realIndex; // Atualiza o índice do slide ativo
      },
    },
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Ajusta o número de slides com base na largura da tela
    // this.updateSlidesPerView();
    // window.addEventListener('resize', this.updateSlidesPerView.bind(this));

    setTimeout(() => {
      const swiperElement = document.querySelector('swiper-container') as HTMLElement & { initialize: () => void };
      if (swiperElement) {
        Object.assign(swiperElement, this.swiperOptions);
        swiperElement.initialize();
      }
      this.cdr.detectChanges(); // Força a detecção de mudanças após inicializar
    });
  }

  // updateSlidesPerView(): void {
  //   const isMobile = window.matchMedia('(max-width: 700px)').matches;
  //   this.swiperOptions.slidesPerView = isMobile ? 4 : 3;

  //   const swiperElement = document.querySelector('swiper-container') as HTMLElement & { initialize: () => void };
  //   if (swiperElement) {
  //     Object.assign(swiperElement, this.swiperOptions);
  //     swiperElement.initialize();
  //   }
  // }
}
