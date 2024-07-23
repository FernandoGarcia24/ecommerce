import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) img: string = '';
  @Input() price: number = 0;
  @Input() title: string = '';

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('Click form child');
    this.addToCart.emit('Hola este es un mensaje desde el hijo ' + this.title);
  }

}
