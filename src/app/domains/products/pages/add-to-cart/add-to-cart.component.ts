import { Component, Input, Output, ViewChild, inject, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { SweetAlertComponent } from '@products/pages/sweet-alert/sweet-alert.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, SweetAlertComponent, RouterLinkWithHref, SweetAlertComponent],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent {

  alerts: { id: number, show: boolean }[] = [];

  alertCounter = 0;

  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter();
  private cartService = inject(CartService);
  @ViewChild(SweetAlertComponent) toastComponent?: SweetAlertComponent;
  showToast = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  addToCartHandler(product: Product) {
    this.cartService.addToCart(product);
    // this.triggerToast();
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
    // this.triggerToast();
  }


  decrementQuantity(product: Product) {
    this.cartService.decrementQuantity(product);
  }

  triggerToast() {
    const alertId = this.alertCounter++;
    this.alerts.push({ id: alertId, show: true });
    console.log("alertCounter: ", this.alertCounter)
    console.log("alertId: ", alertId);

    setTimeout(() => this.closeAlert(alertId), 3000);
  }

  trackByAlertId(index: number, alert: any): number {
    return alert.id; // Asegura que Angular rastree cada alerta por su ID único
  }

  closeAlert(alertId: number) {
    const alertIndex = this.alerts.findIndex(alert => alert.id === alertId);
    if (alertIndex !== -1) {
      this.alerts[alertIndex].show = false;
      setTimeout(() => {
        this.alerts.splice(alertIndex, 1);
      }, 500);
    }
  }



}
