import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ProductOrder, Product } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { DialogBoxAcceptComponent } from './dialog-box-accept/dialog-box-accept.component';
declare const showModalMessage: any;

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  positions!: ProductOrder[];
  positionsSub: Subscription | undefined;
  orderSub: Subscription | undefined;
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'price', 'orderFuncs'];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.positionsSub = this.orderService.getMyCart().subscribe(
        (data: ProductOrder[]) => {
          if (data.length > 0) {
            this.positions = data;
            this.dataSource = new MatTableDataSource(this.positions);
          }
        }
      )
      let products = localStorage.getItem('products')
      if (products) {
        this.orderService.addToCartLocalItems(JSON.parse(products)).subscribe(
          items => {
            this.positions = this.positions.concat(items);
            this.dataSource = new MatTableDataSource(this.positions);
            localStorage.removeItem('products');
          }
        )
      }
    } else {
      let products = localStorage.getItem('products');
      if (products) this.positions = JSON.parse(products);
      this.dataSource = new MatTableDataSource(this.positions);
    }

  }

  ngOnDestroy(): void {
    if (this.positions && !this.authService.isAuthenticated()) {
      this.orderService.updateLocalItems(this.positions);
    }
    if (this.positions && this.authService.isAuthenticated()) {
      this.orderService.updateMyOrder(this.positions).subscribe();
    }
    if (this.positionsSub) {
      this.positionsSub.unsubscribe();
    }
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  openDialog() {
    this.dialog.open(DialogBoxAcceptComponent)
  }

  removePosition(element: ProductOrder) {
    if (!this.positions) return;
    for (let i = 0; i < this.positions.length; i++) {
      if (this.positions[i] == element) {
        this.positions.splice(i, 1);
        this.dataSource.data = this.positions;
        showModalMessage('Успешно удалено');
      }
    }

    if (this.authService.isAuthenticated()) {
      this.orderService.remove(element).subscribe()
    }
  }

  removeAll() {
    if (this.authService.isAuthenticated()) {
      this.orderSub = this.orderService.removeAll().subscribe(
        res => {
          this.positions = [];
          this.dataSource.data = this.positions;
          showModalMessage('Удалено');
        },
        err => showModalMessage(err.error.message)
      )
    }else {
      this.positions = [];
      this.dataSource.data = this.positions;
      showModalMessage('Удалено'); 
    }
  }

  increment(element: ProductOrder) {
    element.quantity < 99 ? element.quantity++ : element.quantity = 99;
    this.getElementPrice(element);
  }

  decrement(element: ProductOrder) {
    element.quantity > 1 ? element.quantity-- : element.quantity = 1;
    this.getElementPrice(element);
  }

  getElementPrice(element: ProductOrder): string {
    return String(+element.products.price * element.quantity);
  }

  getTotalPrice() {
    return this.positions.length > 0 ? this.positions.map(item => +this.getElementPrice(item)).reduce((acc, value) => acc + value) : 0;
  }

}
