import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListCategory = "http://localhost:19776/api/Category/getall-category";
const urlCreateCategory = "http://localhost:19776/api/Category/create-category"
const urlUpdateCategory = "http://localhost:19776/api/Category/update-category"
const urlGetCategoryById = "http://localhost:19776/api/Category/get-category-by-id"
const urlDeleteCategoryById = "http://localhost:19776/api/Category/delete-category"
const urlSortByCategory = "http://localhost:19776/api/Category/sortby-category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  GetListCategory():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListCategory).pipe(
      tap(() => console.log("OK"))
    )
  }

  CreateCategory(data:Object):Observable<Object> {
    return this.http.post<Object>(urlCreateCategory,data);
  }

  GetCategoryById(cateId:any):Observable<Object> {
    return this.http.get<Object>(urlGetCategoryById+`?id=${cateId}`);
  }

  UpdateCategory(data:Object):Observable<Object> {
    return this.http.post<Object>(urlUpdateCategory,data);
  }

  DeleteCategory(cateId:any):Observable<Object> {
    return this.http.get<Object>(urlDeleteCategoryById+`?Id=${cateId}`);
  }

  SortByCategory(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByCategory+`?sort=${sort}`);
  }
}
