import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../order.service';
import {mergeMap, take} from 'rxjs/operators';
import {OrderData} from '../../../api';
import {filterByString} from '../../shared/utils/filters-utils';
import {OrderCreateComponent} from '../create/create.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  list: OrderData[] = [];

  giver: string;

  loading: boolean = true;

  @ViewChild(OrderCreateComponent) orderCreateComponent: OrderCreateComponent;

  constructor(private service: OrderService,
              private route: ActivatedRoute) {
  }

  get listFromFilter(): OrderData[] {
    return this.list
      .filter(this.filterByGiver.bind(this));
  }

  ngOnInit() {
    this.service
      .getList()
      .pipe(
        mergeMap(list => this.service.listData(list))
      )
      .subscribe(list => {
        this.list = list;
      });

    this.reloadList();

    if (this.route.snapshot.data && this.route.snapshot.data.create) {
      this.createOrder();
    }
  }

  reloadList(): void {
    this.loading = true;
    this.service
      .loadList()
      .pipe(take(1))
      .subscribe(list => {
        this.loading = false;
      });
  }

  filterByGiver(item: OrderData): boolean {
    return filterByString(item.giver.name, this.giver);
  }

  createOrder(): void {
    this.orderCreateComponent.open();
  }

  editOrder(id: string): void {
    this.service
      .loadOrder(id)
      .subscribe(data => {
        console.log('data', data);
        this.orderCreateComponent.open(data);
      });
  }

}
