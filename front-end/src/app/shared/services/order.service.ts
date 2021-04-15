import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductOrder } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  addToCart(product: Product) {
    if (this.authService.isAuthenticated()) {
      return this.http.post('/api/order/addToCart', product);
    } else {
      let productsString = localStorage.getItem('products');
      let products: ProductOrder[] = [];
      let productsOrder: ProductOrder;
      if (productsString) products = JSON.parse(productsString);
      productsOrder = {
        'products': {
          'id': product.id,
          'name': product.name,
          'price': product.price
        },
        'quantity': product.quantity
      }
      products = products.concat([productsOrder]);
      localStorage.setItem('products', JSON.stringify(products));
      return of(true);
    }
  }

  addToCartLocalItems(products: ProductOrder[]): Observable<ProductOrder[]> {
    return this.http.post<ProductOrder[]>('/api/order/updateMyOrder', products);
  }

  getLocalitems() {

  }

  checkout() {
    return this.http.get('/api/order/checkout');
  }

  updateLocalItems(items: ProductOrder[]) {
    localStorage.setItem('products', JSON.stringify(items));
  }

  updateMyOrder(items: ProductOrder[]): Observable<ProductOrder[]> {
    return this.http.post<ProductOrder[]>('/api/order/updateMyOrder', items);
  }

  getMyCart(): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>('/api/order/myCart');
  }

  remove(item: ProductOrder) {
    return this.http.delete(`/api/order/product/${item.id}`);
  }

  removeAll() {
    return this.http.delete('/api/order/products');
  }

}
