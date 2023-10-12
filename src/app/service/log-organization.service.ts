import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Log, ModelInputLog, OrganizationModel, StatusResponseModel, TelcoModel } from '../models/log.model';
import { Injectable } from '@angular/core';
const urlGetListLog = "https://localhost:44337/api/HNI/getList-log-organization";
const urlGetListTelco = "https://localhost:44337/api/HNI/getList-telco";
const urlGetListStatus = "https://localhost:44337/api/HNI/getList-response-status";
const urlGetListOrganization = "https://localhost:44337/api/HNI/getList-organization"
@Injectable({
  providedIn: 'root'
})
export class LogOrganizationService {

  constructor(private http:HttpClient) { }

  GetListLogOrganization(data:any):Observable<ModelInputLog> {
    return this.http.post<ModelInputLog>(urlGetListLog,data);
  }

  GetListTelco():Observable<TelcoModel[]> {
    return this.http.get<TelcoModel[]>(urlGetListTelco).pipe(
      tap(() => console.log("Ok"),
      )
    )
  }

  GetListStatusResponse():Observable<StatusResponseModel[]> {
    return this.http.get<StatusResponseModel[]>(urlGetListStatus).pipe(
      tap(() => console.log("OK"),
      )
    )
  }

  GetListOrganization(unitId:any):Observable<OrganizationModel[]> {
    return this.http.get<OrganizationModel[]>(urlGetListOrganization+`?unitID=${unitId}`).pipe(
      tap(() => console.log("OK"),
      )
    )
  }
}
