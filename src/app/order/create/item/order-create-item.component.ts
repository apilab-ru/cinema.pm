import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderGood, Stock} from '../../../../api';
import {OrderService} from '../../order.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-order-create-item',
  templateUrl: './order-create-item.component.html',
  styleUrls: ['./order-create-item.component.scss']
})
export class OrderCreateItemComponent {

  @Input() item: OrderGood;

  @Input() stocks: Stock[];

  @Input() begin: string;

  @Input() end: string;

  @Output() deleteItem = new EventEmitter();

  @Output() changeItemEvent = new EventEmitter();

  constructor(private orderService: OrderService) {
  }

  changeItem(item: OrderGood): void {
    item.price = null;
    item.deposit = null;
    this.changeItemEvent.emit();
  }

  getPrice(item: OrderGood): Observable<number> {
    return this.orderService.getPrice(item, this.begin, this.end);
  }

  getDeposit(item: OrderGood): number {
    return this.orderService.getDeposit(item, this.stocks);
  }

}
