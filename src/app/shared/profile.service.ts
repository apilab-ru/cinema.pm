import {Injectable} from '@angular/core';
import {Cinema} from '../../api';

@Injectable()
export class ProfileService {

  cinemas: Cinema[] = [];

  constructor() {
    const list = localStorage['cinemas'];
    if (list) {
      this.cinemas = JSON.parse(list);
    }
  }

  addCinema(cinema: Cinema): void {
    this.cinemas.push(cinema);
    this.update();
  }

  deleteCinema(id: string): void {
    const index = this.cinemas.findIndex(it => it.imdbID === id);
    if (index) {
      this.cinemas.splice(index, 1);
      this.update();
    }
  }

  update(): void {
    localStorage['cinemas'] = JSON.stringify(this.cinemas);
  }

}
