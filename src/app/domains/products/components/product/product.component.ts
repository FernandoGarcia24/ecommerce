import { Component, Input, Output, EventEmitter, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { CartService } from '@shared/services/cart.service';
import { CarouselComponent } from '@products/pages/carousel/carousel.component'
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe'
import { SweetAlertComponent } from '@products/pages/sweet-alert/sweet-alert.component';
import { AddToCartComponent } from '@products/pages/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkActive, CarouselComponent, TruncatePipe, SweetAlertComponent, AddToCartComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input({required: true}) product!: Product;
  @Output() addToCart = new EventEmitter();
  private cartService = inject(CartService);
  @ViewChild(SweetAlertComponent) toastComponent!: SweetAlertComponent;
  currentSlideIndex = 0;

  addToCartHandler(product: Product) {
    this.cartService.addToCart(product);
    console.log("Valor", this.product)
  }

  isProductInCart(product: Product) {
    return this.cartService.cart().some(item => item.id === product.id);
  }

  getProductQuantity(product: Product) {
    const item = this.cartService.cart().find(item => item.id === product.id);
    return item ? item.quantity : 0;
  }

  incrementQuantity(product: Product) {
    this.cartService.incrementQuantity(product);
  }

  decrementQuantity(product: Product) {
    this.cartService.decrementQuantity(product);
  }

  triggerToast() {
    if (this.toastComponent) {
      this.toastComponent.show = true;
      this.toastComponent.startAutoClose(); // Asegúrate de que se llame al método para iniciar el temporizador
    }
  }



}
