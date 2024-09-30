import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js'

import { sign } from 'crypto';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({required: true}) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer;
  isplaying = signal(false);

  ngAfterViewInit() {
    WaveSurfer.create({
      url: this.audioUrl,
      container:this.container.nativeElement
    })
    this.ws.on('play', () => this.isplaying.set(true));
    this.ws.on('pause', () => this.isplaying.set(false));
  }

  playPause() {
    this.ws.playPause();
  }



}
