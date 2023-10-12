import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogOrganizationService } from 'src/app/service/log-organization.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuantityBrandNameService } from 'src/app/service/quantity-brand-name.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-quantity-brandname',
  templateUrl: './quantity-brandname.component.html',
  styleUrls: ['./quantity-brandname.component.css']
})
export class QuantityBrandnameComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private jwtHelper: JwtHelperService,private logService:LogOrganizationService,private quantityBrandName: QuantityBrandNameService) { }
  listOrganization = [];
  listQuantityBrandName = [];
  p:number = 1;
  pageSize:number = 10;
  message:any;
  last:any;
  fileName= 'ExcelSheet.xlsx';

  ngOnInit() {
    this.GetUnitId();
    this.GetListOrganization();
    this.GetDataOutputByLegalEntity();
  }

  infoForm = this.fb.group({
    "unitId":[this.GetUnitId()],
    "fromDate":[null],
    "toDate":[null],
  })

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

  GetDataOutputByLegalEntity() {
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

    this.quantityBrandName.GetListStatisticalOfBrandName(model).subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listQuantityBrandName = res.data;
        this.last = this.listQuantityBrandName[this.listQuantityBrandName.length -1]
        this.notification.showSuccess(res.message,"Success");
      }
      if(res.code === 400 || res.code === 500) {
        this.listQuantityBrandName = [];
        this.notification.showSuccess("lấy dữ liệu thành công","Success");
      }
    })
  }
  onSubmit(){
    this.GetDataOutputByLegalEntity();
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
