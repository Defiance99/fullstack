import {  Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
declare const showModalMessage: any;

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  previewImgSrc: string | undefined;
  product$!: Observable<Product>;
  products$!: Observable<Product[]>;
  counter: number = 1;
  routeSubscription!: Subscription;
  orderSubscription: Subscription | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activateRoute.params.subscribe(param => {
      this.product$ = this.productService.getById(param.id);
    })
    this.product$.subscribe((product: Product) => {
      this.previewImgSrc = product.previewImage;
      this.products$ = this.productService.getByFilters(product.category[0], product.chartDays[0]);
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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

  updatePreviewImg(src: string) {
    this.previewImgSrc = src;
  } 

}
