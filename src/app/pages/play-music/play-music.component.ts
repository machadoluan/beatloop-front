import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-play-music',
  standalone: true,
  imports: [],
  templateUrl: './play-music.component.html',
  styleUrl: './play-music.component.scss'
})
export class PlayMusicComponent {

  @Input() card: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}


