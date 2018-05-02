import {Component, HostBinding, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../../../api';
import {SpinnerService} from '../../shared/spinner.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  user: User;

  login: string = 'admin';

  pass: string = 'admin';

  error: string = null;

  constructor(private service: UserService,
              private spinner: SpinnerService) {
  }

  @HostBinding('class.show') get checkAuth(): boolean {
    return !this.user;
  }

  ngOnInit() {
    this.service.getUser()
      .subscribe(user => this.user = user);
  }

  auth(): void {
    this.error = null;
    this.spinner.show();
    this.service
      .auth(this.login, this.pass)
      .subscribe(result => {
        if (result.error_text) {
          this.error = result.error_text;
        } else {
          this.login = null;
          this.pass = null;
        }
      })
      .add(() => this.spinner.hide());
  }

}
