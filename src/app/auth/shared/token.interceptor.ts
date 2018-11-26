//se encarga en interceptar cada request. va buscar el token del usuario y lo agrega al request. se usa para validacion en el server

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAuthToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
      }
      });
    }
    return next.handle(request);
  }
}
