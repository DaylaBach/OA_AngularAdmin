import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListAddressAccount = "http://localhost:19776/api/Address/getall-address-account";
const urlGetAddressAccountById = "http://localhost:19776/api/Address/get-address-by-id";
const urlCreateAddressAccount = "http://localhost:19776/api/Address/insert-address-account";
const urlUpdateAddressAccount = "http://localhost:19776/api/Address/update-address-account";
const urlDeleteAddressAccount = "http://localhost:19776/api/Address/delete-address-account";
const urlSortByAddressAccount = "http://localhost:19776/api/Address/sortby-address";

@Injectable({
  providedIn: 'root'
})
export class AddressAccountService {

  constructor(private http:HttpClient) { }

  GetListAddressAccount():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListAddressAccount).pipe(
      tap(() => console.log("OK"))
    )
  }

  GetAddressAccountById(id:any):Observable<Object[]> {
    return this.http.get<Object[]>(urlGetAddressAccountById + `?addressId=${id}`)
  }

  CreateAddressAccount(data):Observable<Object[]> {
    return this.http.post<Object[]>(urlCreateAddressAccount, data)
  }

  UpdateAddressAccount(data):Observable<Object[]> {
    return this.http.post<Object[]>(urlUpdateAddressAccount, data)
  }

  DeleteAddressAccount(id):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeleteAddressAccount + "?addressId="+id).pipe(
      tap(() => console.log("OK"))
    )
  }

  SortByAddress(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByAddressAccount+`?sort=${sort}`).pipe(
      tap(() => console.log("OK"))
    )
  }
}
