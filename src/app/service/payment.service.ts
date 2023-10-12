import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListPayment = "http://localhost:19776/api/Payment/getall-payment";
const urlGetPaymentById = "http://localhost:19776/api/Payment/get-payment-by-id";
const urlCreatePayment = "http://localhost:19776/api/Payment/insert-payment";
const urlUpdatePayment = "http://localhost:19776/api/Payment/update-payment";
const urlDeletePayment = "http://localhost:19776/api/Payment/delete-payment-by-id";
const urlSortByPayment = "http://localhost:19776/api/Payment/sortby-payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  GetListPayment():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListPayment).pipe(
      tap(() => console.log("OK"))
    )
  }

  GetPaymentById(id:any):Observable<Object[]> {
     return this.http.get<Object[]>(urlGetPaymentById+`?paymentId=${id}`);
  }

  CreatePayment(data:Object):Observable<Object> {
    return this.http.post<Object>(urlCreatePayment,data);
  }

  UpdatePayment(data:Object):Observable<Object[]> {
    return this.http.post<Object[]>(urlUpdatePayment, data);
  }

  DeletePayment(id):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeletePayment + `?paymentId=${id}`);
  }

  SortByPayment(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByPayment+`?sort=${sort}`).pipe(
      tap(() => console.log("OK"))
    )
  }
}
