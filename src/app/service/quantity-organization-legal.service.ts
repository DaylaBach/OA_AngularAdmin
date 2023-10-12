import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const urlGetListByLegalEntity = "https://localhost:44337/api/HNI/getList-by-legal-entity"

@Injectable({
  providedIn: 'root'
})
export class QuantityOrganizationLegalService {

  constructor(private http: HttpClient) { }

  GetListByLegalEntity(data:Object):Observable<Object> {
    return this.http.post(urlGetListByLegalEntity,data);
  }
}
