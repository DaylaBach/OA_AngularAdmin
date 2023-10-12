import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService, private userService : UserService,private router:Router) { }

  listUsers = [];
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
    this.GetListUser();
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


  GetListUser() {
   this.userService.GetListUser().subscribe((res: any) => {
      console.log("klsjdclsdn"+res.status);
      if (res.code == 200) {
        this.listUsers = res.data;
        this.last = this.listUsers[this.listUsers.length - 1];
        this.notification.showSuccess(res.message, "Success");
      }
      // if (statusCode == 403) {
      //   this.router.navigate(['/']);
      // }
      if(res.code != 200) {
        this.notification.showError(res.message, "Error");
        this.listUsers = [];
      }
    })
  }
  ShowUserDetail(id:any) {
    this.userService.GetUserById(id).subscribe((res:any) =>{
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
    this.userService.GetUserById(id).subscribe((res:any) =>{
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
    this.userService.UpdateUser(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetListUser()
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  DeleteUser(id){
    if(confirm("Are you sure?")){
      this.userService.DeleteUser(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetListUser()
        }else if(res.code == 403) {
          this.listUsers = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listUsers = [];
        }
      })
    }
  }

    onChange(sizeValue) {
      this.pageSize = sizeValue
    }

    onChanges(sortValue) {
      this.userService.SortByUser(sortValue).subscribe((res:any)=>{
        console.log(res);
        if(res.code == 200) {
          this.listUsers = res.data;
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
