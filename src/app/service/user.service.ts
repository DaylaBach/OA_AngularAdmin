import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlLogin = "http://localhost:19776/api/user/login";
const urlGetListUser  = "http://localhost:19776/api/user/getAll-user"
const urlGetUserById  = "http://localhost:19776/api/user/get-user-by-id"
const urlCreateUser  = "http://localhost:19776/api/user/create-user"
const urlUpdateUser  = "http://localhost:19776/api/user/update-user"
const urlDeleteUser  = "http://localhost:19776/api/user/delete-user"
const urlSortByUser  = "http://localhost:19776/api/user/sortby-user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  LoginUser(data:Object):Observable<Object> {
    return this.http.post<Object>(urlLogin,data)
  }

  GetListUser():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListUser).pipe(
      tap(() => console.log("OK")
      )
    )
  }

  GetUserById(Id:any):Observable<Object> {
    return this.http.get<Object>(urlGetUserById+`?userId=${Id}`);
  }

  CreateUser(data:Object):Observable<Object[]> {
    return this.http.post<Object[]>(urlCreateUser, data);
  }

  UpdateUser(data:Object):Observable<Object> {
    return this.http.post<Object>(urlUpdateUser,data);
  }

  DeleteUser(id):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeleteUser + `?userId=${id}`);
  }

  SortByUser(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByUser+`?sort=${sort}`).pipe(
      tap(() => console.log("OK"))
    )
  }
}
