import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { AddressAccountService } from 'src/app/service/address-account.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  constructor(private fb:FormBuilder,private addressAccountService:AddressAccountService, private accountService:AccountService,private router:Router,private notification:NotificationService) { }
  listAccount = [];

  ngOnInit() {
    this.getListAccount();
  }

  get f() {
    return this.infoForm.controls
  }

  infoForm = this.fb.group({
    "address":["",[Validators.required]],
    "image":["image"],
    "accountId":["", [Validators.required]]
  })

  getListAccount(){
    this.accountService.GetListAccount().subscribe((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.listAccount = res.data;
        this.notification.showSuccess(res.message, "Success");
      }
      if (res.code == 403) {
        this.listAccount = [];
        this.router.navigate(['/admin/page/page/forbidden']);
      }
    })
  }

  onSubmit(){
    for (const i in this.infoForm.controls) {
      this.infoForm.controls[i].markAsDirty();
      this.infoForm.controls[i].updateValueAndValidity();
    }
    let model = {
      ...this.infoForm.value
    }
    this.addressAccountService.CreateAddressAccount(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.router.navigate(['address/list-address'])
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

}
