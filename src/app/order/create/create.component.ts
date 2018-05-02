import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../../shared/modal/modal.component';
import {CreateOrder, Employee, Order, Place, Stock} from '../../../api';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {SpinnerService} from '../../shared/spinner.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class OrderCreateComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  order: CreateOrder = {
    goods: []
  };

  stocks: Stock[];

  statuses;

  employees: Employee[];

  places: Place[];

  constructor(
    private orderService: OrderService,
    private spinner: SpinnerService) {
    this.statuses = orderService.statuses;
  }

  ngOnInit(): void {
    this.orderService
      .getStocks()
      .subscribe(list => this.stocks = list);

    this.orderService
      .getPlaces()
      .subscribe(list => this.places = list);

    this.orderService
      .getEmployees()
      .subscribe(list => {
        this.employees = list;
      });
  }

  getDateString(date: Date): string {
    return `${date.getFullYear()}-${this.padStr(date.getMonth() + 1)}-${this.padStr(date.getDate())}`
      + `T${this.padStr(date.getHours())}:${this.padStr(date.getMinutes())}`;
  }

  padStr(value: number): string {
    return value.toString().padStart(2, '0');
  }

  init(order?: Order): void {
    if (!order) {
      const today = new Date();
      const next = new Date();
      next.setDate(today.getDate() + 3);
      this.order = {
        begin: this.getDateString(today),
        end: this.getDateString(next),
        goods: [
          {
            model_id: '1',
            count: 1
          },
          {
            model_id: '2',
            count: 2
          },
          {
            model_id: '3',
            count: 3
          }
        ]
      };
    } else {
      order.begin = this.getDateString(new Date(order.begin));
      order.end = this.getDateString(new Date(order.end));
      this.order = order;
    }

  }

  open(order?: Order): void {
    this.init(order);
    this.modal.open();
  }

  close(): void {
    this.modal.close();
  }

  deleteGood(index: number): void {
    this.order.goods.splice(index, 1);
  }

  changeItemEvent(): void {
    this.order.total_amount = 0;
    this.order.total_deposit = 0;
    this.order.total_price = 0;
  }

  addGood(): void {
    this.order.goods.push({
      model_id: '1',
      count: 1
    });
  }

  getTotalDeposit(): number {
    return this.orderService.getTotalDeposit(this.order, this.stocks);
  }

  getTotalAmount(): Observable<number> {
    return this.orderService.getTotalAmount(this.order);
  }

  getTotalPrice(): Observable<number> {
    return this.orderService.getTotalPrice(this.order, this.stocks);
  }

  changeDate(): void {
    this.order.goods.forEach(item => {
      item.price = 0;
    });
  }

  recount(): void {
    this.changeItemEvent();
  }

  save(): void {
    this.spinner.show();
    const order = this.order;
    forkJoin(
      order.goods.map(good => this.orderService.getPrice(good, order.begin, order.end))
    ).pipe(
      map(list => {
        order.goods.forEach((item, index) => {
          item.price = list[index];
        });
      }),
      mergeMap(() =>
        forkJoin(
          of(this.orderService.getTotalDeposit(order, this.stocks)),
          of(this.orderService.getTotalDelivery(order)),
          this.orderService.getTotalAmount(order),
          this.orderService.getTotalPrice(order, this.stocks)
        )
      ),
      map(result => {
        const [deposit, delivery, amount, price] = result;
        order.total_price = price;
        order.total_deposit = deposit;
        order.total_delivery = delivery;
        order.total_amount = amount;
        return order;
      }),
      mergeMap(() => {
        if (order.id) {
          return this.orderService.updateOrder(order);
        } else {
          return this.orderService.createOrder(order);
        }
      })
    ).subscribe(result => {
      this.close();
    }).add(() => this.spinner.hide());
  }
}


