import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/service/notification.service';
import { QuantityOrganizationLegalService } from 'src/app/service/quantity-organization-legal.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-quantity-organization-legal',
  templateUrl: './quantity-organization-legal.component.html',
  styleUrls: ['./quantity-organization-legal.component.css']
})
export class QuantityOrganizationLegalComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private organizationLegal: QuantityOrganizationLegalService,private jwtHelper: JwtHelperService) { }
  listOrganizationLegal = [];
  p:number = 1;
  pageSize:number = 10;
  message:any;
  last:any;
  fileName= 'ExcelSheet.xlsx';

  ngOnInit() {
    this.GetUnitId();
    this.GetDataByLegalEntity();
  }

  infoForm = this.fb.group({
    "unitId":[this.GetUnitId()],
    "name":[null],
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

  GetDataByLegalEntity() {
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

    this.organizationLegal.GetListByLegalEntity(model).subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listOrganizationLegal = res.data;
        this.last = this.listOrganizationLegal[this.listOrganizationLegal.length -1]
        this.notification.showSuccess(res.message,"Success");
      }
      if(res.code === 400 || res.code === 500) {
        this.listOrganizationLegal = [];
        this.notification.showSuccess("lấy dữ liệu thành công","Success");
      }
    })
  }

  onSubmit(){
    this.GetDataByLegalEntity();
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  // hàm xuất Excel
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
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

  Search() {
    var name = this.infoForm.controls.name.value;
    if(name == "") {
      this.ngOnInit();
    }else{
      this.listOrganizationLegal = this.listOrganizationLegal.filter(res => {
        return res.time.toLocaleLowerCase().match(name.toLocaleLowerCase());
      })
    }
  }
}
