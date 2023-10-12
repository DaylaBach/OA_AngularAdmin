import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb:FormBuilder,private accountService:AccountService,private router:Router,private notification:NotificationService) { }

  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageBase64: string | null = null;

  ngOnInit() {
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
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

  infoForm = this.fb.group({
    "userName":["",[Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z0-9]+$')]],
    "email":["",[Validators.required]],
    "phone":["",[Validators.required]],
    "birthday":[],
    "password":["",[Validators.required]],
    "address":["",[Validators.required]],
    "sate":true,
    "avatar":[[Validators.required]]
})

get f() {
  return this.infoForm.controls
}

onSubmit() {
  // đoạn này sẽ for check đièu kiện của form nếu không hợp lệ sẽ hiển thị ra lỗi
  for (const i in this.infoForm.controls) {
    this.infoForm.controls[i].markAsDirty();
    this.infoForm.controls[i].updateValueAndValidity();
  }
  const pipe = new DatePipe('en-US');
  var birthday = this.infoForm.controls.birthday.value;
  if(birthday != null) {
    var cvFromDate =  birthday.replaceAll("-","/")
    cvFromDate = pipe.transform(cvFromDate,"dd/MM/yyyy")
    }
  let model = {
    ...this.infoForm.value,
    birthday:cvFromDate,
    avatar : this.imageBase64
  }
  this.accountService.CreateAccount(model).subscribe((res:any)=>{
    console.log(res);
    if(res.code == 200) {
      this.router.navigate(['account/list-account'])
      this.notification.showSuccess(res.message,"Success")
    }else{
      this.notification.showError(res.message,"Error")
    }
  })
}

}
