import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export default class CartComponent {

  hideSideMenu = signal(true);
  cateries = signal<Category[]>([]);
  isDropdownVisible = true;
  private cartService = inject(CartService);
  private categoryService = inject(CategoryService);

  cart = this.cartService.cart;
  total = this.cartService.total;
  deleteItem = this.cartService.deleteItem;
  decrementQuantity = this.cartService.decrementQuantity;
  incrementQuantity = this.cartService.incrementQuantity;

  ngOnInit() {
    this.getCategories();
  }

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  getCategories() {
    if (!this.isDropdownVisible) {
      this.categoryService.getAll()
        .subscribe({
          next: (data) => {
            this.cateries.set(data);
            console.log(data);
            this.isDropdownVisible = true;
          },
          error: () => {
            console.error('Error fetching categories');
          }
        })
    } else {
      this.isDropdownVisible = false;
    }

  }

  trackByCategoryId(index: number, category: any): number {
    return category.id;
  }



}
