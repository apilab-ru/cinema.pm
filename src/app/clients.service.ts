import {Injectable} from '@angular/core';
import {Client} from '../api';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {tap} from 'rxjs/operators';

@Injectable()
export class ClientsService {

  clients = new Map<string, Client>();

  constructor() {
  }

  getList(): Observable<Client[]> {
    return of([
      {
        name: 'Василий',
        id: '1',
        phone: '8800200002'
      }
    ]);
  }

  getClient(id: string): Observable<Client> {
    if (this.clients.has(id)) {
      return of(this.clients.get(id));
    } else {
      return this.loadClient(id)
        .pipe(tap(it => this.clients[id] = it));
    }
  }

  // TODO загрузка клиентов
  loadClient(id: string): Observable<Client> {
    return of({
      name: 'Василий',
      id,
      phone: '8800200002'
    });
  }
}
