import {Component, HostBinding, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../../api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @HostBinding('class.open') isOpen = false;

  user: User;

  constructor(private service: UserService) {
  }

  ngOnInit(): void {
    this.service
      .getUser()
      .subscribe(user => this.user = user);
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    this.service.logout();
  }

}
