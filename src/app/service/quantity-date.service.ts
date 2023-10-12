import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const urlGetListStatisticalOfUnits = "https://localhost:44337/api/HNI/getList-statistical-of-units"

@Injectable({
  providedIn: 'root'
})
export class QuantityDateService {

  constructor(private http: HttpClient) { }

  GetListStatisticalOfUnits(data:Object):Observable<Object> {
    return this.http.post<Object>(urlGetListStatisticalOfUnits,data);
  }
}
