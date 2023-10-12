
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogOrganizationService } from 'src/app/service/log-organization.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuantityDateService } from 'src/app/service/quantity-date.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-quantity-date',
  templateUrl: './quantity-date.component.html',
  styleUrls: ['./quantity-date.component.css']
})
export class QuantityDateComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private jwtHelper: JwtHelperService,private logService:LogOrganizationService,private quantityDate: QuantityDateService) { }

  listQuantityDate = []
  listOrganization = [];
  p:number = 1;
  pageSize:number = 31;
  message:any;
  last:any;
  fileName= 'ExcelSheet.xlsx';

  infoForm = this.fb.group({
    "unitId":[this.GetUnitId()],
    "fromDate":[null],
    "toDate":[null],
  })

  ngOnInit() {
    this.GetUnitId();
    this.GetListOrganization();
    this.GetDataStatisticalOfUnits();
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

  // hàm lấy ra danh sách đơn vị
  GetListOrganization() {
    this.logService.GetListOrganization(this.GetUnitId()).subscribe((res:any) => {
      console.log(res);
      if(res) {
        this.listOrganization = res.data;
      }
    })
  }

  GetDataStatisticalOfUnits() {
    const pipe = new DatePipe('en-US');

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

    let model = {
      ...this.infoForm.value,
      fromDate:cvFromDate,
      toDate:cvToDate
    }

    this.quantityDate.GetListStatisticalOfUnits(model).subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listQuantityDate = res.data;
        this.last = this.listQuantityDate[this.listQuantityDate.length -1]
        this.notification.showSuccess(res.message,"Success");
      }
      if(res.code === 400 || res.code === 500) {
        this.listQuantityDate = [];
        this.notification.showSuccess("lấy dữ liệu thành công","Success");
      }
    })
  }
  onSubmit(){
    this.GetDataStatisticalOfUnits();
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
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

    // hàm sắp xếp
    key : string =  'id';
    reverse: boolean = false;
    sortby(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
}
