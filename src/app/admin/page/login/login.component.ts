import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,private notification:NotificationService) { }
  message: any;
  infoForm = this.fb.group({
    "email":["",[Validators.required,Validators.maxLength(50)]],
    "password":["",[Validators.required,Validators.maxLength(50)]],
  })

  ngOnInit():void {
  }

  get f() {
    return this.infoForm.controls
  }

  onSubmit() {
      this.userService.LoginUser(this.infoForm.value).subscribe((res:any)=>{
        if(res.code === 200) {
          localStorage.setItem('currentUser',JSON.stringify({token: res.data}))
          // chuyển trang
          this.router.navigate(['/'])
          this.notification.showSuccess(res.message,"Success");
        }else{
          this.notification.showError(res.message,"Error");
          this.message = res.message;
        }
      },
    )
  }

}
