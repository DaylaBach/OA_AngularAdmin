import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CommentService } from 'src/app/service/comment.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private commentService:CommentService, private accountService:AccountService,private productService:ProductService) { }
  listComment = [];
  listAccount=[];
  listProduct=[];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';
  image:any;

  formDetail = this.fb.group({
    "commentId":"",
    "question":"",
    "accountId":"",
    "productId":"",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "commentId":"",
    "question":"",
    "answer":"",
    "accountId":"",
    "productId":"",
    "createdDate":"",
    "updatedDate" : "",
  })

  ngOnInit() {
    this.GetAllComment();
    this.getListAccount();
    this.getAllProduct();
  }

  ShowCommentDetail(id:any) {
    this.commentService.GetCommentById(id).subscribe((res:any) =>{
      console.log(res)
      this.formDetail = this.fb.group({
        "commentId" : [`${res.data.commentId}`],
        "question": [`${res.data.question}`],
        "accountId" : [`${res.data.account.userName}`],
        "productId": [`${res.data.product.productName}`],
        "image" : [`${res.data.product.image}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
      this.image = this.formDetail.controls.image.value
    })
  }

  ShowFormUpdateDetail(id:any) {
    this.commentService.GetCommentById(id).subscribe((res:any) =>{
      console.log(res)
      this.formUpdate = this.fb.group({
        "commentId" : [`${res.data.commentId}`],
        "question": [`${res.data.question}`],
        "accountId" : [`${res.data.accountId}`],
        "answer" : [`${res.data.answer}`],
        "productId": [`${res.data.productId}`],
        "image" : [`${res.data.product.image}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
      this.image = this.formUpdate.controls.image.value
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
    this.commentService.UpdateComment(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetAllComment()
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  GetAllComment() {
    this.commentService.GetListComment().subscribe((res:any) =>{
      console.log(res)
      if(res.code == 200) {
        this.listComment = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listComment = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listComment = [];
      }
    })
  }

  getListAccount(){
    this.accountService.GetListAccount().subscribe((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.listAccount = res.data;
      }
      if (res.code == 403) {
        this.listAccount = [];
        this.router.navigate(['/admin/page/page/forbidden']);
      }
    })
  }

  getAllProduct() {
    this.productService.GetListProducr().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listProduct = res.data;
      }else if(res.code == 403) {
        this.listProduct = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listProduct = [];
      }
    })
  }

  DeleteComment(id){
    if(confirm("Are you sure?")){
      this.commentService.DeleteComment(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetAllComment()
        }else if(res.code == 403) {
          this.listComment = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listComment = [];
        }
      })
    }
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  onChanges(sortValue) {
    this.commentService.SortByComment(sortValue).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.listComment = res.data;
      }else{
        this.notification.showError(res.message,"Error")
      }
    });
  }

  onChangeProduct(event: any) {
    const proId = event.target.value;
    this.productService.GetProductById(proId).subscribe((res:any) => {
      console.log(res);
      this.image = res.data.image
    })
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
