import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component'
import { CounterComponent } from '@shared/components/counter/counter.component'
import { NotFountComponent } from '@info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/pages/list/list.component')
      },
      {
        path: 'about',
        loadComponent: () => import('./domains/info/pages/about/about.component')
      },
      {
        path: 'cart',
        loadComponent: () => import('./domains/shared/components/cart/cart.component')
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component')
      },
    ]
  },
  {
    path: 'payment',
    component: CounterComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/pages/end-checkout/end-checkout.component')
      }
    ]
  },
  {
    path: '**',
    component: NotFountComponent
  }
];
