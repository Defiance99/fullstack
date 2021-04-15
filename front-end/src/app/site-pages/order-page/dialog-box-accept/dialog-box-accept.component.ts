import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
declare const showModalMessage: any;

@Component({
  selector: 'app-dialog-box-accept',
  templateUrl: './dialog-box-accept.component.html',
  styleUrls: ['./dialog-box-accept.component.scss']
})
export class DialogBoxAcceptComponent implements OnInit, OnDestroy {

  checkoutSub: Subscription | undefined;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  checkout() {
    this.checkoutSub = this.orderService.checkout().subscribe(
      () => showModalMessage('Оплачено')
    )
  }

  ngOnDestroy(): void {
    if (this.checkoutSub) this.checkoutSub.unsubscribe();
  }

}
