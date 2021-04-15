import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit, OnDestroy, AfterViewInit {

  querySubscription: Subscription | undefined;
  products$!: Observable<Product[]>;
  maxPrice = {
    'range': 'max',
    'price': ''
  };
  minPrice = {
    'range': 'min',
    'price': '',
  }
  price: string = '';
  searchStr: string = '';
  state: string[] = [];
  categories: string[] = [];
  chartDays: string[] = [];
  currency: string = '';
  opened: boolean = true

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.products$ = this.productService.getPositions();
    this.querySubscription = this.route.queryParams.subscribe(
      queryParam => {
        if (queryParam['category']) this.categories = [queryParam['category']];
        if (queryParam['chartDays']) this.chartDays = [queryParam['chartDays']];
      }
    )
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {

  }

  clear() {
    this.price = '';
    this.searchStr = '';
    this.state = [];
    this.categories = [];
    this.chartDays = [];
    this.currency = '';
    this.maxPrice.price = '';
    this.minPrice.price = '';
  }
}
