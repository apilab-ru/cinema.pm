import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {mergeMap, take} from 'rxjs/operators';
import {OrderData} from '../../../api';
import {filterByString} from '../../shared/utils/filters-utils';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  list: OrderData[];

  giver: string;

  loading: boolean = true;

  constructor(private service: OrderService) {
  }

  ngOnInit() {
    this.reloadList();
  }

  reloadList(): void {
    this.loading = true;
    this.service
      .loadList()
      .pipe(
        take(1),
        mergeMap(list => this.service.listData(list))
      )
      .subscribe(list => {
        this.loading = false;
        this.list = list;
      });
  }

  get listFromFilter(): OrderData[]{
    return this.list
      .filter(this.filterByGiver.bind(this));
  }

  filterByGiver(item: OrderData): boolean {
    return filterByString(item.giver.name, this.giver);
  }

}
