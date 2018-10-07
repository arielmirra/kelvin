import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import {HttpService} from './http.service';
import {User} from '../../shared/users/User';
import {UserCredentials} from '../../shared/users/UserCredentials';
import {ClientCredentials} from '../../shared/users/ClientCredentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService,
              private router: Router,
              private cookieService: CookieService) {
  }

  login(clientCredentials: ClientCredentials): Observable<boolean> {
    const json = clientCredentials.asJson();
    return this.http.post('/auth', json)
      .pipe(
        map((response) => {
          this.cookieService.set('token', response.body.token);
          console.log(response.body.token);
          return true;
        }),
        catchError(err => {
          console.log(err);
          return Observable.of(false);
        })
      );
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get('/user')
      .pipe(
        map((response) => {
          return response.body.map(a => Object.assign(User.empty(), a));
        }),
        catchError(err => {
          console.log(err);
          return Observable.of([]);
        })
      );
  }

  addUser(userCredentials: UserCredentials): Observable<boolean> {
    const json = userCredentials.asJson();
    console.log(json);
    return this.http.post('/user', json)
      .pipe(
        map(() => true),
        catchError(err => {
          console.log(err);
          return Observable.of(false);
        })
      );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get('/user/' + userId)
      .pipe(
        map((response) => {
          return Object.assign(User.empty(), response.body);
        }),
        catchError(err => {
          console.log(err);
          return Observable.of(null);
        })
      );
  }

  getUserId(): Observable<String> {
    return this.http.get('/user/me')
      .pipe(
        map((response) => {
          return response.body.id;
        }),
        catchError(err => {
          console.log(err);
          return null;
        })
      );
  }

  getLoggedUser(): Observable<User> {
    return this.http.get('/user/me')
      .pipe(
        map((response) => {
          return Object.assign(User.empty(), response.body);
        }),
        catchError(err => {
          console.log(err);
          return null;
        })
      );
  }

  deleteUser(userId: string): Observable<boolean> {
    return this.http.delete('/user/' + userId)
      .pipe(
        map(() => true),
        catchError(err => {
          console.log(err);
          return Observable.of(false);
        })
      );
  }

}
