import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
declare const showModalMessage: any;

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit, OnDestroy {

  @Input() product!: Product
  isLoading: boolean = false;
  counter: number = 1;
  orderSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

  addToCart(product: Product) {
    product.quantity = this.counter;
    this.orderSubscription = this.orderService.addToCart(product).subscribe(
      () => showModalMessage('Успешно добавлено'),
      err => showModalMessage(err.message)
    )
  }

  hideLoader() {
    this.isLoading = true;
  }

  decrement() {
    if (this.counter > 1) {
      this.counter--;
    }
  }

  increment() {
    if (this.counter < 100) {
      this.counter++;
    }
  }

}
