import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Banner, Card } from '../../models/interface';


@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    CommonModule
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})


export class BrowseComponent implements OnInit {
  // Banners
  banners: Banner[] = [
    {
      imageUrl: 'https://img.freepik.com/fotos-gratis/uma-pintura-de-um-lago-de-montanha-com-uma-montanha-ao-fundo_188544-9126.jpg',
      title: 'Os Melhores Samples de Funk para Download',
    },
    {
      imageUrl: 'https://t3.ftcdn.net/jpg/06/59/38/36/360_F_659383627_UtpH18oGF0QlsEkhg0Sn5zVJIVlaoBsg.jpg',
      title: 'Pacote Exclusivo de Samples para Trap',
    },
    {
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwcvQsM8-g8UhqIkYhqovspXo29w2py-MZLaIBlHXL9w6X15KhrwmQrEplNiMeVNnrkZsYznXjYFlLXwJ0a-cEI5OQv7_MUv1MF5xc434aM88hZZ-JnU-Id8EGWHOcAXCBAkEZL3VKjCWE-BtfLP7p8UoO50SZ0rOGd2OtV1gz2hDOfxd3UP6AG3TViQ/s1600-rw/4k-pc-wallpaper-ai-art.webp',
      title: 'Samples Profissionais para Música Eletrônica',
    },
    {
      imageUrl: 'https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-cute-wallpapers-cats-wallpapers-hd-4k-wallpapers-desktop-wallpapers-hd-image_2562853.jpg',
      title: 'Loops e Samples para Hip Hop Nacional',
    },
    {
      imageUrl: 'https://aws-obg-image-lb-1.tcl.com/content/dam/brandsite/region/brazil/news/blogs-35-45/4K-vs-8K-TVs-The-Visual-Difference-Plus-Pros-And-Con.jpg',
      title: 'Kit de Samples para Produtores Iniciantes',
    }
  ];
  currentBannerIndex = 0;
  animationClass: string = '';

  // Cards

  cards: Card[] = [
    {
      imageUrl: 'https://i.pinimg.com/originals/66/b3/24/66b3247f3e0ed3fa5279221874f628ac.jpg',
      title: 'Naruto Pack Vol. 1',
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
      imageUrl: 'https://i.pinimg.com/564x/6f/38/a2/6f38a24c53e43b679418de1ac366f8da.jpg',
      title: 'Demon Slayer Pack',
      subtitle: 'Samurai Beats',
      type: 'Today sounds'
    }
  ];

  constructor(
  ) { }

  ngOnInit() {
    this.loadBanners();
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
}
