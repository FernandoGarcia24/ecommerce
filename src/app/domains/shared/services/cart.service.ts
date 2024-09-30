import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);

  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total +  (product.price * product.quantity), 0);
  })

  constructor() { }

  addToCart(product: Product) {
    const existingProduct = this.cart().find(item => item.id === product.id);

    if (existingProduct) {
      this.incrementQuantity(existingProduct);
    } else {
      this.cart.update(state => [...state, { ...product, quantity: 1 }]);
    }
  }

  totalItemsInCart(): number {
    return this.cart().reduce((sum, product) => sum + product.quantity, 0);
  }

  deleteItem(product: Product) {
    this.cart.update(cartItems => cartItems.filter(item => item.id !== product.id));
  }

  incrementQuantity(product: Product) {
    this.cart.update(cartItems =>
      cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    console.log(product.quantity)
  }

  decrementQuantity(product: Product) {
    const currentCart = this.cart();
    if (currentCart) {
      this.cart.update(cartItems =>
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        )
      );
    }
    console.log(product.quantity)
  }
}

