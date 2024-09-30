import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {

  currentSlideIndex = 0;
  @Input({required: true}) product!: Product;

  nextSlide() {
    if (this.currentSlideIndex < this.product.images.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0; // Opción: Volver al inicio al llegar al final
    }
  }

  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.product.images.length - 1; // Opción: Ir al final al retroceder desde el principio
    }
  }

}
