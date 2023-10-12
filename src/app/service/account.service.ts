import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
const urlgetByNameTokenLogin = "http://localhost:19776/api/user/get-by-name-token";
const urlGetListAccount = "http://localhost:19776/api/Account/getall-account";
const urlCreateAccount = "http://localhost:19776/api/Account/signup-account";
const urlGetAccountById = "http://localhost:19776/api/Account/get-account-by-id";
const urlDeleteAccount = "http://localhost:19776/api/Account/delete-account";
const urlUpdateAccount = "http://localhost:19776/api/Account/update-account";
const urlSortByAccount = "http://localhost:19776/api/Account/sortby-account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  GetListAccount():Observable<Object> {
    return this.http.get<Object>(urlGetListAccount)
  }

  GetAccountById(id):Observable<Object> {
    return this.http.get<Object>(urlGetAccountById+"?accountId="+id)
  }

  CreateAccount(data:Object):Observable<Object> {
    return this.http.post<Object>(urlCreateAccount,data)
  }

  UpdateAccount(data:Object):Observable<Object> {
    return this.http.post<Object>(urlUpdateAccount,data)
  }

  DeleteAccount(id):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeleteAccount + "?accountId="+id)
  }

  GetByNameToken(email:string):Observable<Object> {
    return this.http.get<Object>(urlgetByNameTokenLogin+`?email=${email}`).pipe(
         tap(() => console.log("OK"),
      )
    )
  }

  SortByAccount(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByAccount+`?sort=${sort}`).pipe(
      tap(() => console.log("OK"))
    )
  }
}
