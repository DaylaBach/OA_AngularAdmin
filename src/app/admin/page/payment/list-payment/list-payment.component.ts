import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderService } from 'src/app/service/order.service';
import { PaymentService } from 'src/app/service/payment.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private paymentService:PaymentService, private orderService:OrderService) { }
  listPayment = [];
  listOrder = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';

  ngOnInit() {
    this.GetAllPayment();
  }

  formDetail = this.fb.group({
    "paymentId":"",
    "type":"",
    "amount":"",
    "bank":"",
    "orderId" :"",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "paymentId":"",
    "type":"",
    "amount":"",
    "bank":"",
    "orderId" :"",
    "createdDate":"",
    "updatedDate" : "",
  })

  ShowPaymentDetail(id:any) {
    this.paymentService.GetPaymentById(id).subscribe((res:any) =>{
      console.log(res)
      this.formDetail = this.fb.group({
        "paymentId" : [`${res.data.paymentId}`],
        "type": [`${res.data.type}`],
        "amount" : [`${res.data.amount}`],
        "bank": [`${res.data.bank}`],
        "orderId" : [`${res.data.orderId}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
    })
  }

  ShowFormUpdateDetail(id:any) {
    this.GetAllOrder();
    this.paymentService.GetPaymentById(id).subscribe((res:any) =>{
      console.log(res)
      this.formUpdate = this.fb.group({
        "paymentId" : [`${res.data.paymentId}`],
        "type": [`${res.data.type}`],
        "amount" : [`${res.data.amount}`],
        "bank": [`${res.data.bank}`],
        "orderId" : [`${res.data.orderId}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
    })
  }

  GetAllPayment() {
    this.paymentService.GetListPayment().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listPayment = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listPayment = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listPayment = [];
      }
    })
  }

  GetAllOrder() {
    this.orderService.GetListOrder().subscribe((res:any) => {
      console.log(res)
      if(res.code == 200) {
        this.listOrder = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listOrder = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listOrder = [];
      }
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
    this.paymentService.UpdatePayment(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetAllPayment();
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  DeletePayment(id){
    if(confirm("Are you sure?")){
      this.paymentService.DeletePayment(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetAllPayment()
        }else if(res.code == 403) {
          this.listPayment = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listPayment = [];
        }
      })
    }
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  onChanges(sortValue) {
    this.paymentService.SortByPayment(sortValue).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.listPayment = res.data;
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
