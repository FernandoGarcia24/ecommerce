import { Component, Input, SimpleChange, SimpleChanges, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // NO ASYNC
    // Before render
    console.log('constructor');
    console.log('-'.repeat(10))
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10))
    console.log(changes)
    const duration = changes['duration']
    console.log(duration)
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething
    }
    // if (changes['message']) {
    //   console.log('Message changed:', changes['message'].currentValue);
    // }
  }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('Initial duration:', this.duration);
    console.log('Initial message:', this.message);
    this.counterRef = window.setInterval(() => {
      this.counter.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngAteViewInit() {
    // after render
    // hijos ya fueron pintados
    console.log('ngAteViewInit');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef)
  }

  ngOnDestroy() {
    //
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
  }

  doSomething() {
    console.log('change duration')
  }



}
