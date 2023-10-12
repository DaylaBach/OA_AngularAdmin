export class Log {
  description:string;
  requestTime:Date;
  responseTime:Date;
  phoneNumber:string;
  telco:string;
  brandName:string;
  content:string;
  status:string;
  smS_ID:string;

  Log(description:string, requestTime:Date, responseTime:Date, phoneNumber:string,telco:string,brandName:string, content:string,status:string, smS_ID:string){
    this.description = description;
    this.requestTime = requestTime;
    this.responseTime = responseTime;
    this.phoneNumber = phoneNumber;
    this.telco = telco;
    this.brandName = brandName;
    this.content = content;
    this.status = status;
    this.smS_ID = smS_ID;
  }
}

export class ModelInputLog
{
  unitId:string;
  brandName:string;
  fromDate:Date;
  toDate:Date;
  phoneNumber:string;
  telco:string;
  pageSize:number;
  pageNumber:number;
  status:string;
  ModelInputLog(brandName:string,fromDate:Date,toDate:Date,phoneNumber:string,telco:string,pageSize:number,pageNumber:number,status:string) {
    this.brandName = brandName;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.phoneNumber = phoneNumber;
    this.telco = telco;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.status = status;
  }
}

export class TelcoModel
{
  telco:string;
  TelcoModel(telco:string) {
    this.telco = telco;
  }
}

export class StatusResponseModel {
  statusId:number;
  statusName:string;
  StatusResponseModel(statusId:number, statusName:string) {
    this.statusId = statusId;
    this.statusName = statusName;
  }
}

export class OrganizationModel {
  unitID:string;
  description:string;
  OrganizationModel(unitID:string, description:string) {
    this.unitID = unitID;
    this.description = description;
  }
}
