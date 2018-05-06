import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Client, Employee, Order, Place, Stock} from '../../../api';
import {OrderService} from '../order.service';
import {SpinnerService} from '../../shared/spinner.service';
import {ClientsService} from '../../clients.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent {

  @ViewChild(ModalComponent) modal: ModalComponent;

  order: Order;

  stocks: Stock[] = [];

  client: Client;

  employees: Employee[] = [];

  places: Place[] = [];

  constructor(private service: OrderService,
              private spinner: SpinnerService,
              private clientsService: ClientsService) {
  }

  init(): void {
    this.service
      .getStocks()
      .subscribe(list => this.stocks = list);

    this.service
      .getPlaces()
      .subscribe(list => this.places = list);

    this.service
      .getEmployees()
      .subscribe(list => this.employees = list);
  }

  open(order: string): void {
    this.load(order);
    this.modal.open();
    this.init();
  }

  close(): void {
    this.modal.close();
  }

  getStockName(id: string): string {
    const stock = this.stocks.find(it => it.id === id);
    return stock ? stock.name : null;
  }

  getEmployeeName(id: string): string {
    const employee = this.employees.find(it => it.id === id);
    return employee ? employee.name : null;
  }

  getPlaceName(id: string): string {
    const place = this.places.find(it => it.id === id);
    return place ? place.name : null;
  }

  load(id: string): void {
    this.spinner.show();
    this.service.loadOrder(id)
      .subscribe(order => {
        this.order = order;
        this.loadClient(order.id);
      }, error => alert('Ошибка'))
      .add(() => this.spinner.hide());
  }

  reload(): void {
    this.load(this.order.id);
  }

  loadClient(id: string): void {
    this.client = null;
    this.clientsService.getClient(id)
      .subscribe(client => this.client = client);
  }

  isStatusReady(): boolean {
    return this.order ? this.order.status === 'ожидает' : false;
  }

  isStatusTookAway(): boolean {
    return this.order ? this.order.status === 'забрали' : false;
  }

  isStatusComplete(): boolean {
    return this.order ? this.order.status === 'вернули' : false;
  }

}
