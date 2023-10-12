import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErorInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
         this.router.navigate(['Medlatec/login'])
        }else if (err.status === 403) {
          this.router.navigate(['page/forbidden'])
        }
        return throwError("Có lỗi trong quá trình xử lí");
      })
    );
  }
}
