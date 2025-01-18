import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Banner, BannerOffers, Card, OneShot } from '../../models/interface';
import { PlayMusicComponent } from "../play-music/play-music.component";
import WaveSurfer from 'wavesurfer.js';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    PlayMusicComponent,
    MatCheckboxModule,
    FooterComponent
],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})


export class BrowseComponent implements OnInit, AfterViewInit {
  // ViewsChild
  @ViewChildren('waveformContainer') container!: QueryList<ElementRef>;
  @ViewChildren('cardsContainer') carousels!: QueryList<ElementRef>

  // Banners
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

  // Banners Offers
  bannersOffers: BannerOffers[] = [
    {
      imageUrl: 'https://blog.nvidia.com.br/wp-content/uploads/sites/12/2023/04/2022-nvidia-corporate-key-visual-banner-4K-2-scaled.jpg',
      title: 'Pack Premium de Samples - 50% OFF',
      subtitle: 'Mais de 1000 samples profissionais por um preço especial'
    }
  ];

  // Cards
  cards: Card[] = [
    {
      imageUrl: 'https://i.pinimg.com/originals/66/b3/24/66b3247f3e0ed3fa5279221874f628ac.jpg',
      title: 'Signature Vol. 2',
      subtitle: 'Anime Beats',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/4c/fa/29/4cfa2971aaae1523cfaf9d4a87e4b6a0.jpg',
      title: 'Dragon Ball Pack',
      subtitle: 'Anime Phonk',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://logosmarcas.net/wp-content/uploads/2021/10/One-Piece-Logo.png',
      title: 'One Piece Collection',
      subtitle: 'Anime Trap',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/55/ee/ed/55eeedda290da30ade77f7a312f36c69.jpg',
      title: 'Attack on Titan Vol. 1',
      subtitle: 'Epic Beats',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/55/ee/ed/55eeedda290da30ade77f7a312f36c69.jpg',
      title: 'Attack on Titan Vol. 1',
      subtitle: 'Epic Beats',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/55/ee/ed/55eeedda290da30ade77f7a312f36c69.jpg',
      title: 'Attack on Titan Vol. 1',
      subtitle: 'Epic Beats',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/55/ee/ed/55eeedda290da30ade77f7a312f36c69.jpg',
      title: 'Attack on Titan Vol. 1',
      subtitle: 'Epic Beats',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/55/ee/ed/55eeedda290da30ade77f7a312f36c69.jpg',
      title: 'Attack on Titan Vol. 1',
      subtitle: 'Epic Beats',
      type: 'Today sounds'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/6f/38/a2/6f38a24c53e43b679418de1ac366f8da.jpg',
      title: 'Demon Slayer Pack',
      subtitle: 'Samurai Beats',
      type: 'Today sounds'
    }
  ];

  // Categories
  categories = [
    { name: 'INSTRUMENTS', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop' },
    { name: 'EFFECTS', imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop' },
    { name: 'EQ', imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070&auto=format&fit=crop' },
    { name: 'DELAY', imageUrl: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?q=80&w=2070&auto=format&fit=crop' },
    { name: 'REVERB', imageUrl: 'https://images.unsplash.com/photo-1626128665085-483747621778?q=80&w=2070&auto=format&fit=crop' },
    { name: 'SAMPLERS', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' },
    { name: 'MASTERING', imageUrl: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop' },
    { name: 'DISTORTION', imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=2070&auto=format&fit=crop' },
    { name: 'COMPRESSOR', imageUrl: 'https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?q=80&w=2070&auto=format&fit=crop' },
    { name: 'VOCAL', imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop' },
    { name: 'SYNTHESIZERS', imageUrl: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop' },
    { name: 'DRUMS', imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=2070&auto=format&fit=crop' }
  ];

  // One Shots
  oneShots: OneShot[] = [
    { title: 'APT', subtitle: 'Bruno Mars', imageUrl: 'https://cdn-images.dzcdn.net/images/cover/258e6042338ce64bb4157c0c94b232ac/0x1900-000000-80-0-0.jpg', music: '' },
    { title: 'Bad Liar', subtitle: 'Imagine Dragons', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273da6f73a25f4c79d0e6b4a8bd', music: '' },
    { title: 'Drive License', subtitle: 'Olivia Rodrigo', imageUrl: 'https://s2-g1.glbimg.com/XKc4iWAR1rOmbCK55PGBymr1W6w=/0x0:2000x2000/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/2/h/WCTKdxRVGnhyoE1A6jiA/oliviacapa.jpg', music: '' },
    { title: 'Die With Small', subtitle: 'Bruno Mars', imageUrl: 'https://cdn-images.dzcdn.net/images/cover/4bd5903f4ce8f2601916bfadb44efe8a/0x1900-000000-80-0-0.jpg', music: '' }
  ]

  // Variables
  showPlayMusic: boolean = false;
  selectedCard: any;
  currentBannerIndex = 0;
  animationClass: string = '';
  playReady: boolean[] = [];
  waveSurfer: WaveSurfer[] = [];
  currentTime: string[] = [];
  totalTime: string[] = [];
  scrollDisponivel: boolean = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadBanners();
  }

  ngAfterViewInit(): void {
    this.oneShots.forEach((oneShot, index) => {
      this.waveSurfer[index] = WaveSurfer.create({
        container: this.container.toArray()[index].nativeElement,
        waveColor: 'white',
        progressColor: '#6EC281',
        width: 200,
        height: 40,
      })
      this.waveSurfer[index].load(oneShot.music);
      this.waveSurfer[index].on('ready', () => {
        this.playReady[index] = true;
        this.totalTime[index] = this.formatTime(this.waveSurfer[index].getDuration());
      });
      this.waveSurfer[index].on('audioprocess', () => {
        this.currentTime[index] = this.formatTime(this.waveSurfer[index].getCurrentTime());
      });
    })
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  togglePlayMusic(index: number): void {
    console.log(`Toggling play/pause for index: ${index}, isPlaying: ${this.waveSurfer[index]?.isPlaying()}`);
    if (this.waveSurfer[index]?.isPlaying()) {
      this.waveSurfer[index].pause();
    } else {
      this.waveSurfer[index].play();
    }
  }

  async loadBanners() {
    try {
      // this.banners = await this.service.getBanners().toPromise();
      // Opcional: iniciar rotação automática
      this.startAutoRotation();
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
    }
  }

  selectBanner(index: number) {
    this.animationClass = 'fade-out';
    setTimeout(() => {
      this.currentBannerIndex = index;
      this.animationClass = 'fade-in';
    }, 500); // Tempo igual à duração da transição no CSS
  }

  // Opcional: rotação automática
  private startAutoRotation() {
    setInterval(() => {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
        this.animationClass = 'fade-in';
      }, 500);
    }, 10000);
  }

  onPlayMusic(card: Card) {
    this.showPlayMusic = true;
    this.selectedCard = card;
  }

  onClosePlayMusic() {
    this.showPlayMusic = false;
  }

  scrollLeft(index: number) {
    const carousel = this.carousels.toArray()[index]
    carousel.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }
  scrollRight(index: number) {
    const carousel = this.carousels.toArray()[index]
    carousel.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
  }

  
}


