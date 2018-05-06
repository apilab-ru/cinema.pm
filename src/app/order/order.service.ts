import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {BaseResponse, CreateOrder, Employee, ListOrderDetails, Order, OrderData, OrderGood, OrderResponse, Place, Stock} from '../../api';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {map, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ClientsService} from '../clients.service';

@Injectable()
export class OrderService {

  readonly daySeconds = 3600 * 1000 * 24;

  private ordersSubject = new ReplaySubject<Order[]>(1);

  private mockStocks = [
    {
      id: '1',
      name: 'Палатка',
      price: 100,
      deposit: 3500
    },
    {
      id: '2',
      name: 'Спальник',
      price: 100,
      deposit: 1000
    },
    {
      id: '3',
      name: 'Котелок',
      price: 100,
      deposit: 1200
    }
  ];

  private mockEmployees = [
    {
      id: '1',
      name: 'Иван'
    },
    {
      id: '2',
      name: 'Эдик'
    }
  ];

  statuses = [
    'ожидает',
    'забрали',
    'вернули',
    'отменён'
  ];

  places: Place[] = [
    {
      id: '1',
      name: 'Аврора 153'
    },
    {
      id: '2',
      name: 'Гагарина 50'
    },
    {
      id: '11',
      name: 'Пушкинская'
    },
    {
      id: '12',
      name: 'Склад'
    }
  ];

  constructor(
    @Inject('API') private endpoint: string,
    private http: HttpClient,
    private clientsService: ClientsService
  ) {
  }

  loadList(): Observable<Order[]> {
    return this.http.get<ListOrderDetails>(this.endpoint + 'list_orders_with_details')
      .pipe(
        take(1),
        map(result => {

          result.orders.forEach(order => {
            ['total_amount', 'total_deposit'].forEach(key => {
              order[key] = parseInt(order[key], 10);
            });
          });

          return result.orders;
        }),
        tap(list => this.ordersSubject.next(list))
      );
  }

  getList(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  // TODO загрузка товаров
  getStocks(): Observable<Stock[]> {
    return of(this.mockStocks);
  }

  // TODO загрузка Сотрудников
  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees);
  }

  // TODO загрузка пунктов выдачи/приёма
  getPlaces(): Observable<Place[]> {
    return of(this.places);
  }

  listData(list: Order[]): Observable<OrderData[]> {
    return forkJoin(
      this.getStocks().pipe(take(1)),
      this.getEmployees().pipe(take(1)),
      this.clientsService.getList()
    ).pipe(map(data => {
      const dataList: OrderData[] = [];

      const [stocks, employees, clients] = data;

      list.forEach((item: OrderData) => {
        item.taker = employees.find((employee: Employee) => employee.id === item.taker_id);
        item.giver = employees.find((employee: Employee) => employee.id === item.giver_id);
        item.stocks = [];
        item.client = clients.find(it => it.id === item.client_id);
        item.goods.map(good => {
          const stock = stocks.find((s: Stock) => s.id === good.model_id);
          item.stocks.push({
            name: stock.name,
            ...good
          });
        });
        dataList.push(item);
      });
      return dataList;
    }));
  }

  getPrice(item: OrderGood, start: string, end: string): Observable<number> {
    if (item.price) {
      return of(item.price);
    } else {
      return this.loadPrice(item, start, end);
    }
  }

  // TODO метод получени ястоимости залога
  getDeposit(item: OrderGood, stocks: Stock[]): number {
    if (item.deposit) {
      return item.deposit;
    } else {
      return stocks.find(s => s.id === item.model_id).deposit * item.count;
    }
  }

  getTotalDeposit(order: CreateOrder, stocks: Stock[]): number {
    if (order.total_deposit) {
      return order.total_deposit;
    } else {
      return order.goods.reduce((prev, current) => {
        return prev + this.getDeposit(current, stocks);
      }, 0);
    }
  }

  getTotalAmount(order: CreateOrder): Observable<number> {
    if (order.total_amount) {
      return of(order.total_amount);
    } else {
      return forkJoin(order.goods.map(good => this.getPrice(good, order.begin, order.end)))
        .pipe(
          map(data => {
            return data.reduce((current, next) => current + next, 0);
          })
        );
    }
  }

  getTotalDelivery(order: CreateOrder): number {
    if (order.total_delivery) {
      return order.total_delivery;
    } else {
      return 0;
    }
  }

  getTotalPrice(order: CreateOrder, stocks: Stock[]): Observable<number> {
    if (order.total_price) {
      return of(order.total_price);
    } else {
      return forkJoin(
        of(this.getTotalDeposit(order, stocks)),
        of(this.getTotalDelivery(order)),
        this.getTotalAmount(order)
      ).pipe(
        map(data => {
          const [deposit, delivery, amount] = data;
          return deposit + amount + delivery;
        })
      );
    }
  }

  // TODO метод loadPrice
  loadPrice(item: OrderGood, start: string, end: string): Observable<number> {

    const diff = this.difDates(start, end);

    return this.getStocks()
      .pipe(
        map(stocks => {
          const stock = stocks.find(s => s.id === item.model_id);
          return item.count * diff * stock.price;
        })
      );
  }

  difDates(start: string, end: string): number {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);
    return Math.round((dateEnd.getTime() - dateStart.getTime()) / this.daySeconds);
  }

  getDateStringRu(date: Date): string {
    return `${this.padStr(date.getDate())}.${this.padStr(date.getMonth() + 1)}.${date.getFullYear()}`
      + ` ${this.padStr(date.getHours())}:${this.padStr(date.getMinutes())}:00`;
  }

  padStr(value: number): string {
    return value.toString().padStart(2, '0');
  }

  // TODO сохранение order
  createOrder(order: CreateOrder): Observable<BaseResponse> {
    const data = {...order};

    delete(data.total_delivery);
    delete(data.total_price);

    data.begin = this.getDateStringRu(new Date(data.begin));

    data.end = this.getDateStringRu(new Date(data.end));

    this.addOrder(data);

    return of({error: false});

    // return this.http.post<BaseResponse>(this.endpoint + 'create_order', JSON.stringify(data));
  }

  // TODO настоящий update order
  updateOrder(order: CreateOrder): Observable<BaseResponse> {

    this.getList()
      .pipe(take(1))
      .subscribe(list => {
        const index = list.findIndex(item => item.id === order.id);
        list[index] = order;
        this.ordersSubject.next([...list]);
      });

    return of({error: false});
  }

  addOrder(order: CreateOrder): void {
    this.getList()
      .pipe(
        take(1)
      )
      .subscribe(list => {
        this.ordersSubject.next([...list, order]);
      });
  }

  loadOrder(id: string): Observable<Order> {
    return this.http.post<OrderResponse>(this.endpoint + 'get_order_details', JSON.stringify({order_id: id}))
      .pipe(
        map(result => {
          return this.parseOrder(result.order);
        })
      );
  }

  parseOrder(order): Order {
    order.goods.forEach(good => {
      good.deposit = parseInt(good.deposit, 10);
      good.price = parseInt(good.price, 10);
    })
    order.total_amount = parseInt(order.total_amount, 10);
    order.total_deposit = parseInt(order.total_deposit, 10);
    return order;
  }

}
