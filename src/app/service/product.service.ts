import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListProduct = "http://localhost:19776/api/Product/getall-product";
const urlCreateProduct = "http://localhost:19776/api/Product/create-product";
const urlGetProductById = "http://localhost:19776/api/Product/get-product-by-id";
const urlUpdateProduct = "http://localhost:19776/api/Product/update-product";
const urlDeleteProduct = "http://localhost:19776/api/Product/delete-product";
const urlSortByProduct = "http://localhost:19776/api/Product/sortby-product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  GetListProducr():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListProduct).pipe(
      tap(() => console.log("OK"))
    )
  }

  CreateProduct(data:Object):Observable<Object[]> {
    return this.http.post<Object[]>(urlCreateProduct, data);
  }

  GetProductById(Id:any):Observable<Object> {
    return this.http.get<Object>(urlGetProductById+`?id=${Id}`);
  }

  UpdateProduct(data:Object):Observable<Object> {
    return this.http.post<Object>(urlUpdateProduct,data);
  }

  DeleteProduct(id):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeleteProduct + `?id=${id}`);
  }

  SortByProduct(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByProduct+`?sort=${sort}`);
  }
}
