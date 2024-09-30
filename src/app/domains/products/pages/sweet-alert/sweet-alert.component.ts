import { Component, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-sweet-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sweet-alert.component.html',
  styleUrl: './sweet-alert.component.css'
})
export class SweetAlertComponent {

  message = `Has añadido correctamente al carrito.`;
  show = true;
  private timerId?: number;
  private progressTimerId?: number;
  // private cartService = inject(CartService);
  progress: number = 100;
  private readonly duration: number = 2000;


  // cart = this.cartService.cart;

  ngOnInit() {
    // Iniciar el temporizador cuando se muestre el toast
    if (this.show) {
      this.startAutoClose();
      this.startProgress();
    }
  }

  startAutoClose() {
    this.timerId = window.setTimeout(() => this.closeToast(), this.duration);
  }

  startProgress() {
    this.progress = 100; // Reinicia el progreso al 100% cuando se inicia
    const step = 100 / (this.duration / 100);
    this.progressTimerId = window.setInterval(() => {
      this.progress -= step;
      if (this.progress <= 0) {
        this.closeToast();
      }
    }, 100);
  }

  closeToast() {
    this.show = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    if (this.progressTimerId) {
      clearInterval(this.progressTimerId);
    }
  }

  ngOnDestroy() {
    // Limpiar el temporizador si el componente se destruye antes de que se cierre el toast
    if (this.timerId) {
      clearTimeout(this.timerId); // Limpiar temporizador de cierre
    }
    if (this.progressTimerId) {
      clearInterval(this.progressTimerId); // Limpiar temporizador de progreso
    }
  }


}
