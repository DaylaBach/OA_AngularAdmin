import { Log, OrganizationModel, StatusResponseModel, TelcoModel } from 'src/app/models/log.model';
import { NotificationService } from 'src/app/service/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogOrganizationService } from 'src/app/service/log-organization.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-organization-log',
  templateUrl: './organization-log.component.html',
  styleUrls: ['./organization-log.component.css']
})
export class OrganizationLogComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private logService:LogOrganizationService,private jwtHelper: JwtHelperService) { }

  listLogOrganizations:Log[]=[];
  listTelco:TelcoModel[]=[];
  listStatus:StatusResponseModel[]=[];
  listOrganization:OrganizationModel[]=[];
  message:any;
  fileName= 'ExcelSheet.xlsx';
  p:number = 1;
  pageSize:number = 20;

  infoForm = this.fb.group({
    "unitId":[this.GetUnitId()],
    "brandName":[""],
    "fromDate":[null],
    "toDate":[null],
    "phoneNumber":[""],
    "telco":[""],
    "status":[""]
  })

  ngOnInit() {
    this.GetUnitId();
    this.GetListTelco();
    this.GetListStatusResponse()
    this.GetListOrganization();
    this.GetDataLogFromService();
  }

  // hàm lấy ra danh sách log của đơn vị
  GetDataLogFromService() {
    const pipe = new DatePipe('en-US');
    var checkStatus = this.infoForm.controls.status.value;
    var checkTelco = this.infoForm.controls.telco.value;
    var dataFromDate = this.infoForm.controls.fromDate.value;
    var dataToDate = this.infoForm.controls.toDate.value;


    if(dataFromDate != null) {
    var cvFromDate =  dataFromDate.replaceAll("-","/")
    cvFromDate = pipe.transform(cvFromDate,"dd/MM/yyyy")
    }
    if(dataToDate != null) {
    var cvToDate = dataToDate.replaceAll("-","/")
    cvToDate = pipe.transform(cvToDate,"dd/MM/yyyy")
    }
    if(checkStatus == "") {
      checkStatus = null;
    }
    if(checkTelco == "") {
      checkTelco = null;
    }
    let model= {
      ...this.infoForm.value,
      status: checkStatus,
      telco: checkTelco,
      fromDate:cvFromDate,
      toDate:cvToDate
    }
    this.logService.GetListLogOrganization(model).subscribe((res:any) => {
      console.log(res);
      if(res.code === 200) {
        this.listLogOrganizations = res.data
        this.notification.showSuccess(res.message,"Success");
      }
      if(res.code === 400 || res.code === 500) {
        this.listLogOrganizations = [];
        this.notification.showSuccess("lấy dữ liệu thành công","Success");
      }
    })
  }

  // hàm lấy ra danh sách đơn vị
  GetListOrganization() {
    this.logService.GetListOrganization(this.GetUnitId()).subscribe((res:any) => {
      console.log(res);
      if(res) {
        this.listOrganization = res.data;
      }
    })
  }
  // hàm lấy danh sách nhà mạng
  GetListTelco() {
    this.logService.GetListTelco().subscribe((res:any) => {
      console.log(res);
      if(res) {
        this.listTelco = res.data
      }
    })
  }

  // hàm lấy ra danh sách trạng thái
  GetListStatusResponse() {
    this.logService.GetListStatusResponse().subscribe((res:any) => {
      console.log(res);
      if(res) {
        this.listStatus = res.data
      }
    })
  }

  // hàm lấy unitId của đơn vị
  GetUnitId() {
    var token = localStorage.getItem('currentUser')
    const tokenDecode = this.jwtHelper.decodeToken(token);
    if(tokenDecode != null) {
      var unitId = tokenDecode.sub[1].Value;
      return unitId;
    }
  }

  // gọi hàm lấy danh sách log của đơn vị và truyền tham số khi submit from
  onSubmit() {
    this.GetDataLogFromService();
  }

  // hàm xuất Excel
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


onChange(sizeValue) {
  this.pageSize = sizeValue
}

  // hàm sắp xếp
  key : string =  'id';
  reverse: boolean = false;
  sortby(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
