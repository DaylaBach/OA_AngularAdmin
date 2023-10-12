import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderService } from 'src/app/service/order.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private orderService:OrderService) { }

  listOrder = [];
  listOrderDetail = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';
  stateName:any;
  listProductDetail = [];

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  formDetail = this.fb.group({
    "orderId" :"",
    "email":"",
    "phone":"",
    "address":"",
    "totalPrice":"",
    "state":"",
    "cancellationReason":"",
    "feedback" : "",
    "accountName" : "",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "orderId" :"",
    "email":"",
    "phone":"",
    "address":"",
    "totalPrice":"",
    "state":"",
    "cancellationReason":"",
    "feedback" : "",
    "accountName" : "",
    "accountId" : "",
    "createdDate":"",
    "updatedDate" : "",
  })

  list = [
    {state : 0, name : "Chờ xác nhận"},
    {state : 1, name : "Đang lấy hàng"},
    {state : 2, name : "Đang giao hàng"},
    {state : 3, name : "Giao hàng thành công"},
    {state : 4, name : "Đơn hủy"}
   ]

  ShowOrderDetail(id:any) {
    this.orderService.GetOrderById(id).subscribe((res:any) =>{
      console.log(res)
      for (let state of this.list)  {
        if(state.state == res.data.state) {
          this.stateName = state.name;
        }
      }
      this.listProductDetail = res.data.listProduct;
      this.formDetail = this.fb.group({
        "orderId" : [`${res.data.orderId}`],
        "email": [`${res.data.email}`],
        "phone": [`${res.data.phone}`],
        "address": [`${res.data.address}`],
        "totalPrice": [`${res.data.totalPrice}`],
        "state": [`${ this.stateName}`],
        "cancellationReason": [`${res.data.cancellationReason}`],
        "feedback" : [`${res.data.feedback}`],
        "accountName" : [`${res.data.account.userName}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
    })
  }



  ShowFormUpdateDetail(id:any) {
    this.orderService.GetOrderById(id).subscribe((res:any) =>{
      console.log(res)
      this.listProductDetail = res.data.listProduct;
      console.log(this.listProductDetail)
      this.formUpdate = this.fb.group({
        "orderId" : [`${res.data.orderId}`],
        "email": [`${res.data.email}`],
        "phone": [`${res.data.phone}`],
        "address": [`${res.data.address}`],
        "totalPrice": [`${res.data.totalPrice}`],
        "state": [`${res.data.state}`],
        "cancellationReason": [`${res.data.cancellationReason}`],
        "feedback" : [`${res.data.feedback}`],
        "accountName" : [`${res.data.account.userName}`],
        "accountId" : [`${res.data.accountId}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
    })
  }


  ngOnInit() {
    this.GetAllOrder();
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

  GetOrderDetailByOrderId(id) {
    this.orderService.GetOrderDetail(id).subscribe((res:any) => {
      console.log(res)
      if(res.code == 200) {
        this.listOrderDetail = res.data;
      }else if(res.code == 403) {
        this.listOrderDetail = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listOrderDetail = [];
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
    this.orderService.UpdateOrder(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetAllOrder();
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  DeleteOrder(id){
    if(confirm("Are you sure?")){
      this.orderService.DeleteOrder(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetAllOrder();
        }else if(res.code == 403) {
          this.listOrder = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listOrder = [];
        }
      })
    }
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

    onChanges(sortValue) {
      this.orderService.SortByOrder(sortValue).subscribe((res:any)=>{
        console.log(res);
        if(res.code == 200) {
          this.listOrder = res.data;
        }else{
          this.notification.showError(res.message,"Error")
        }
      });
    }
}
