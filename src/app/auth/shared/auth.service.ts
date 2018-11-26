import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http'; //conexion al node server
import * as jwt from 'jsonwebtoken'; //decode token
import * as moment from 'moment'; //current time
//import { JwtHelper } from 'angular2-jwt'; 
import 'rxjs/Rx';

class decodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new decodedToken();
    //this.decodedToken = localStorage.getItem('bwm_meta');
  }

  private saveToken(token: string): string {
    //decode token para el timeout. te devuelve cuando vence. 
    this.decodedToken = jwt.decode(token);
    

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private getExpiration() {
    moment.unix(this.decodedToken.exp)
  }

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).map(
      (token) => {
        this.saveToken(<string>token);
      });
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');
    this.decodedToken = new decodedToken();
  }

  public isAuthenticated(): boolean {

    var current = moment().toDate();
    var tokenDate = moment.unix(this.decodedToken.exp).toDate();

    //var bool = moment().isBefore(this.getExpiration());
    return current < tokenDate;
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}
