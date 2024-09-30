import { Component, Input, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { SweetAlertComponent } from '../sweet-alert/sweet-alert.component';
import { RouterLinkWithHref } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, AddToCartComponent, RouterLinkWithHref, AddToCartComponent, SweetAlertComponent, CarouselComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',

})
export default class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  @ViewChild(SweetAlertComponent) toastComponent?: SweetAlertComponent;
  showToast = false;
  @Input({required: true}) productInput!: Product;
  currentSlideIndex = 0;



  nextSlide() {
    const product = this.product();
    console.log(product!.images.length )
    if (this.currentSlideIndex < product!.images.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0; // Opción: Volver al inicio al llegar al final
    }
  }

  previousSlide() {
    const product = this.product();
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = product!.images.length - 1; // Opción: Ir al final al retroceder desde el principio
    }
  }


  addToCartHandler(product: Product) {
    this.cartService.addToCart(product);
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);

    // console.log("Valor", this.product)
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
    this.triggerToast();
  }

  decrementQuantity(product: Product) {
    this.cartService.decrementQuantity(product);
  }

  triggerToast() {
    console.log('triggerToast called');
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Ajusta el tiempo según lo necesites
  }


  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          if(product.images.length > 0) {
            this.cover.set(product.images[0])
          }
        }
      })
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.product();
    if(product) {
      this.cartService.addToCart(product);
    }
  }

}
