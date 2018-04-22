import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Employee, Order, OrderData, Stock} from '../../api';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {map, take} from 'rxjs/operators';

@Injectable()
export class OrderService {

  private mockOrders: Order[] = [
    {
      id: 1,
      status: 'вернули',
      comment: 'заказ с моделями',
      client_id: 1,
      created: '2018-04-11 14:56:13',
      begin: '2018-04-12 12:40:43',
      end: '2019-01-02 10:00:00',
      delivery_address_to: 'sdl,sl;d',
      delivery_address_from: 'Лухачёва 21',
      total_amount: 1300,
      total_deposit: 2500,
      giver_id: 1,
      taker_id: 1,
      give_stock_id: 1,
      take_stock_id: 2,
      goods: [
        {
          model_id: 1,
          count: 1,
          price: 1000,
          deposit: 2000
        },
        {
          model_id: 3,
          count: 2,
          price: 300,
          deposit: 500
        }
      ]
    },
    {
      id: 2,
      status: 'отказались',
      comment: 'заказ с моделями',
      client_id: 1,
      created: '2018-04-11 14:56:13',
      begin: '2018-04-12 12:40:43',
      end: '2019-01-02 10:00:00',
      delivery_address_to: 'sdl,sl;d',
      delivery_address_from: 'Курумоч',
      total_amount: 1600,
      total_deposit: 3000,
      giver_id: 1,
      taker_id: 1,
      give_stock_id: 1,
      take_stock_id: 2,
      goods: [
        {
          model_id: 1,
          count: 1,
          price: 1000,
          deposit: 2000
        },
        {
          model_id: 2,
          count: 2,
          price: 300,
          deposit: 500
        }
      ]
    }
  ];

  private mockStocks = [
    {
      id: 1,
      name: 'Палатка'
    },
    {
      id: 2,
      name: 'Спальник'
    },
    {
      id: 3,
      name: 'Котелок'
    }
  ];

  private mockEmployees = [
    {
      id: 1,
      name: 'Вася'
    },
    {
      id: 2,
      name: 'Миша'
    }
  ];

  constructor() {
  }

  loadList(): Observable<Order[]> {
    return of(this.mockOrders);
  }

  getStocks(): Observable<Stock[]> {
    return of(this.mockStocks);
  }

  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees);
  }

  listData(list: Order[]): Observable<OrderData[]> {
    return forkJoin(
      this.getStocks().pipe(take(1)),
      this.getEmployees().pipe(take(1))
    ).pipe(map(data => {
      const dataList: OrderData[] = [];
      list.forEach((item: OrderData) => {
        item.taker = data[1].find((employee: Employee) => employee.id === item.taker_id);
        item.giver = data[1].find((employee: Employee) => employee.id === item.giver_id);
        item.stocks = [];
        item.goods.map(good => {
          const stock = data[0].find((s: Stock) => s.id === good.model_id);
          item.stocks.push({
            name: stock.name,
            ... good
          });
        });
        dataList.push(item);
      });
      return dataList;
    }));
  }

}
