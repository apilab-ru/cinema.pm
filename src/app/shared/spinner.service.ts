import {Injectable} from '@angular/core';

@Injectable()
export class SpinnerService {

  isShow: boolean = false;

  constructor() {
  }

  show(): void {
    this.isShow = true;
  }

  hide(): void {
    this.isShow = false;
  }

}
