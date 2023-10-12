import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListOrder = "http://localhost:19776/api/Order/getall-order";
const urlGetOrderById = "http://localhost:19776/api/Order/get-order-by-id";
const urlUpdateOrder = "http://localhost:19776/api/Order/update-order";
const urlDeleteOrder = "http://localhost:19776/api/Order/delete-order";
const urlGetOrderDetail = "http://localhost:19776/api/OrderDetail/get-orderdetail-by-orderid";
const urlSortByOrder = "http://localhost:19776/api/Order/sortby-order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  GetListOrder():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListOrder).pipe(
      tap(() => console.log("OK"))
    )
  }

  GetOrderById(id:any):Observable<Object[]> {
    return this.http.get<Object[]>(urlGetOrderById+`?id=${id}`);
  }

  GetOrderDetail(id:any):Observable<Object[]> {
    return this.http.get<Object[]>(urlGetOrderDetail+`?id=${id}`);
  }

  UpdateOrder(data:Object):Observable<Object> {
    return this.http.post<Object>(urlUpdateOrder,data);
  }

  DeleteOrder(id:any):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeleteOrder+`?id=${id}`);
  }

  SortByOrder(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByOrder+`?sort=${sort}`).pipe(
      tap(() => console.log("OK"))
    )
  }
}
