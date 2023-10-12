import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService, private accountService : AccountService,private router:Router) { }

  listAccount = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';
  last:any;

  avatar: any;
  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageold:string;
  imageBase64: string | null = null;
  eventOccurred: boolean = true;

  formDetail = this.fb.group({
    "id" : "",
    "userName" :"",
    "email": "",
    "phone" : "",
    "address" : "",
    "birthday" : "",
    "avatar" : "",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "id" : "",
    "userName" :"",
    "email": "",
    "phone" : "",
    "address" : "",
    "birthday" : "",
    "avatar" : "",
    "password":"",
    "createdDate":"",
    "updatedDate" : "",
  })

  ngOnInit() {
    this.GetListAccount();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.eventOccurred = false;
    if (this.selectedFile) {
      this.readFile(this.selectedFile);
      const reader = new FileReader();
        reader.onloadend = () => {
          this.imageBase64 = reader.result.toString().split(',')[1] || '';
        };
        reader.readAsDataURL(this.selectedFile);
    }
  }

  //  hiển thị ảnh khi chnj ảnh
private readFile(file: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    this.selectedImage = reader.result;
  };
  reader.readAsDataURL(file);
}

  GetListAccount() {
    this.accountService.GetListAccount().subscribe((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.listAccount = res.data;
        this.last = this.listAccount[this.listAccount.length - 1];
        this.notification.showSuccess(res.message, "Success");
      }

      if (res.code == 403) {
        this.listAccount = [];
        this.router.navigate(['/admin/page/page/forbidden']);
      }
    })
  }

    ShowAccDetail(id:any) {
    this.accountService.GetAccountById(id).subscribe((res:any) =>{
      console.log(res)
      this.formDetail = this.fb.group({
        "id":[`${res.data.id}`],
        "avatar" :  [`${res.data.avatar}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
        "userName" :[`${res.data.userName}`],
        "email": [`${res.data.email}`],
        "phone" : [`${res.data.phone}`],
        "address" : [`${res.data.address}`],
        "birthday" : [`${res.data.birthday}`],

      })
      this.avatar = this.formDetail.controls.avatar.value
    })
  }

  ShowFormUpdateDetail(id:any) {
    this.accountService.GetAccountById(id).subscribe((res:any) =>{
      console.log(res)
      this.formUpdate = this.fb.group({
        "id":[`${res.data.id}`],
        "avatar" :  [`${res.data.avatar}`],
        "userName" :[`${res.data.userName}`],
        "email": [`${res.data.email}`],
        "phone" : [`${res.data.phone}`],
        "address" : [`${res.data.address}`],
        "birthday" : [`${res.data.birthday}`],
        "password" : [`${res.data.password}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
      this.imageold = this.formUpdate.controls.avatar.value
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
    const pipe = new DatePipe('en-US');
    var birthday = this.formUpdate.controls.birthday.value;
    if(birthday != null) {
      var cvFromDate =  birthday.replaceAll("-","/")
      cvFromDate = pipe.transform(cvFromDate,"dd/MM/yyyy")
      }
    let model = {
      ...this.formUpdate.value,
      updatedDate : new Date(),
      avatar : this.imageBase64
    }
    this.accountService.UpdateAccount(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetListAccount()
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  DeleteAccount(id){
    if(confirm("Are you sure?")){
      this.accountService.DeleteAccount(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetListAccount()
        }else if(res.code == 403) {
          this.listAccount = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listAccount = [];
        }
      })
    }
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  onChanges(sortValue) {
    this.accountService.SortByAccount(sortValue).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.listAccount = res.data;
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
