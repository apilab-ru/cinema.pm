import {Injectable, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {BaseResponse, User, UserRole} from '../../api';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {delay, tap} from 'rxjs/operators';

@Injectable()
export class UserService {

  userSubject = new ReplaySubject<User>(1);
  isLoaded = false;

  private mockUsers: User[] = [
    {
      id: '1',
      login: 'admin',
      name: 'Администратор',
      role: UserRole.ADMIN,
      password: 'admin'
    }
  ];

  constructor() {
  }

  loadUser(): void {
    this.isLoaded = true;
    const user = localStorage['user'];
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  getUser(): Observable<User> {
    if (!this.isLoaded) {
      this.loadUser();
    }
    return this.userSubject.asObservable();
  }

  logout(): void {
    this.setUser(null);
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage['user'] = JSON.stringify(user);
  }

  auth(login: string, pass: string): Observable<BaseResponse> {
    const user = this.mockUsers
      .find(item => item.login === login && item.password === pass);
    if (user) {
      return of({error: false})
        .pipe(
          delay(500),
          tap(() => this.setUser(user))
        );
    } else {
      return of({
        error: true,
        error_text: 'Неверный логин или пароль'
      });
    }
  }

}
