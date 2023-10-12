import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {

  constructor(private fb:FormBuilder,private paymentService:PaymentService,private orderService:OrderService,private router:Router,private notification:NotificationService) { }
  listOrder=[];

  ngOnInit() {
    this.GetAllOrder();
  }

  infoForm = this.fb.group({
    "type":["", [Validators.required]],
    "amount":["",[Validators.required]],
    "bank":["",[Validators.required]],
    "orderId":["",[Validators.required]]
  })

  get f() {
    return this.infoForm.controls
  }

  onSubmit(){
  // đoạn này sẽ for check đièu kiện của form nếu không hợp lệ sẽ hiển thị ra lỗi
  for (const i in this.infoForm.controls) {
    this.infoForm.controls[i].markAsDirty();
    this.infoForm.controls[i].updateValueAndValidity();
  }

    let model = {
      ...this.infoForm.value
    }

    this.paymentService.CreatePayment(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.router.navigate(['payment/list-payment'])
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  GetAllOrder() {
    this.orderService.GetListOrder().subscribe((res:any) => {
      console.log(res)
      if(res.code == 200) {
        this.listOrder = res.data;
        console.log("Order" + this.listOrder);
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listOrder = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listOrder = [];
      }
    })
  }

}
