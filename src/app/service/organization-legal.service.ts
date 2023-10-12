import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListUnitId = "https://localhost:44337/api/HNI/getlist-unitId";
const urlGetListStatus = "https://localhost:44337/api/HNI/getlist-status-organizationlegal";
const urlCreateUnit = "https://localhost:44337/api/HNI/create-organization-legal"
const urlGetUnitId = "https://localhost:44337/api/HNI/getUnitById";
const urlUpdateUnitId = "https://localhost:44337/api/HNI/update-organization-legal"
@Injectable({
  providedIn: 'root'
})
export class OrganizationLegalService {

  constructor(private http:HttpClient) { }

  GetListStatusOrganization(data:Object):Observable<Object> {
    return this.http.post<Object>(urlGetListUnitId,data);
  }

  GetListStatusOrganizationlegal():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListStatus).pipe(
      tap(() => console.log("OK")
      )
    )
  }

  CreateUnit(data:Object):Observable<Object> {
    return this.http.post<Object>(urlCreateUnit,data);
  }

  UpdateUnit(data:Object):Observable<Object> {
    return this.http.post<Object>(urlUpdateUnitId,data);
  }

  //  lấy Id
  findById(id:any):Observable<Object> {
    return this.http.get<Object>(urlGetUnitId+`?unitId=${id}`);
  }
}
