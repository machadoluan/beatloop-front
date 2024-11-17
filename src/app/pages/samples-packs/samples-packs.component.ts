import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/interface';

@Component({
  selector: 'app-samples-packs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './samples-packs.component.html',
  styleUrl: './samples-packs.component.scss'
})
export class SamplesPacksComponent {
  @ViewChildren('cardsContainer') carousels!: QueryList<ElementRef>

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
  showPlayMusic: boolean = false;
  selectedCard: any;
  filterStates = {
    genres: false,
    loop: false,
    packs: false,
    key: false,
    bpm: false
  }
  animationClass: string = '';

  onPlayMusic(card: Card) {
    this.showPlayMusic = true;
    this.selectedCard = card;
  }

  scrollLeft(index: number) {
    const carousel = this.carousels.toArray()[index]
    carousel.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }
  scrollRight(index: number) {
    const carousel = this.carousels.toArray()[index]
    carousel.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
  }
  openFilter(filter: keyof typeof this.filterStates) {
    if (this.filterStates[filter]) {
      this.animationClass = 'fade-out';

      // Espera a animação de fade-out terminar antes de mudar o estado
      setTimeout(() => {
        this.filterStates[filter] = false;
        this.animationClass = ''; // Remove a classe de animação
      }, 300); // Ajuste o tempo conforme a duração da animação
    } else {
      Object.keys(this.filterStates).forEach((key) => {
        this.filterStates[key as keyof typeof this.filterStates] = false;
      });
      this.filterStates[filter] = true;
      this.animationClass = 'fade-in';
    }
    console.log(this.filterStates);
  }


}
