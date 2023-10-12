import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const urlGetListOutputByLegalEntity = "https://localhost:44337/api/HNI/getList-statistical-of-brandName"

@Injectable({
  providedIn: 'root'
})
export class QuantityBrandNameService {

  constructor(private http: HttpClient) { }

  GetListStatisticalOfBrandName(data:Object):Observable<Object> {
    return this.http.post(urlGetListOutputByLegalEntity,data);
  }
}
