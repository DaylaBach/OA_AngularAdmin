import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressAccountService } from 'src/app/service/address-account.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router, private addressAccountService :  AddressAccountService) { }
  listAddress = [];
  p:number = 1;
  pageSize = 20;
  message:any;
  fileName = 'ExcelSheet.xlsx';

  image: any;
  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageold:string;
  imageBase64: string | null = null;
  eventOccurred: boolean = true;

  formDetail = this.fb.group({
    "addressId":"",
    "address":"",
    "accountId":"",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "addressId":"",
    "address":"",
    "accountName":"",
    "accountId" :"",
    "createdDate":"",
    "updatedDate" : "",
  })

  ngOnInit() {
    this.GetAllAddressAccount();
  }

  ShowAddressDetail(id:any) {
    this.addressAccountService.GetAddressAccountById(id).subscribe((res:any) =>{
      console.log(res)
      this.formDetail = this.fb.group({
        "addressId" : [`${res.data.addressId}`],
        "address" : [`${res.data.address}`],
        "accountId" : [`${res.data.account.userName}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
      console.log("Form" + this.formDetail);
    })
  }

  ShowFormUpdateDetail(id:any) {
    this.addressAccountService.GetAddressAccountById(id).subscribe((res:any) =>{
      console.log(res)
      this.formUpdate = this.fb.group({
        "addressId" : [`${res.data.addressId}`],
        "address" : [`${res.data.address}`],
        "accountName" : [`${res.data.account.userName}`],
        "accountId" : [`${res.data.accountId}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
    })
  }

  onSubmitFromUpdate(event) {
    for (const i in this.formUpdate.controls) {
      this.formUpdate.controls[i].markAsDirty();
      this.formUpdate.controls[i].updateValueAndValidity();
    }

    if (!this.formUpdate.valid) {
      event.stopPropagation()
      return;
    }

    let model = {
      ...this.formUpdate.value,
      updatedDate : new Date()
    }
    this.addressAccountService.UpdateAddressAccount(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetAllAddressAccount()
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  GetAllAddressAccount() {
    this.addressAccountService.GetListAddressAccount().subscribe((res:any) => {
      console.log(res)
      if(res.code == 200) {
        this.listAddress = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listAddress = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listAddress = [];
      }
    })
  }

  DeleteAddressAccount(id){
    if(confirm("Are you sure?")){
      this.addressAccountService.DeleteAddressAccount(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetAllAddressAccount()
        }else if(res.code == 403) {
          this.listAddress = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listAddress = [];
        }
      })
    }
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  onChanges(sortValue) {
    this.addressAccountService.SortByAddress(sortValue).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.listAddress = res.data;
      }else{
        this.notification.showError(res.message,"Error")
      }
    });
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
  }

     // hàm sắp xếp
     key : string =  'id';
     reverse: boolean = false;
     sortby(key){
       this.key = key;
       this.reverse = !this.reverse;
     }
}
