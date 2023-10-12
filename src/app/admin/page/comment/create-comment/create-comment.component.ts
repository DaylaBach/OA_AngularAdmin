import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CommentService } from 'src/app/service/comment.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  constructor(private fb:FormBuilder,private commentService:CommentService, private accountService:AccountService,private productService:ProductService,private router:Router,private notification:NotificationService) { }
  listAccount=[];
  listProduct=[];
  ngOnInit() {
    this.getAllProduct();
    this.getListAccount();
  }

  infoForm = this.fb.group({
    "question":["",[Validators.required]],
    "answer":[""],
    "accountId":["", [Validators.required]],
    "productId":["", [Validators.required]]
  })

  get f() {
    return this.infoForm.controls
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

  onSubmit(){
    for (const i in this.infoForm.controls) {
      this.infoForm.controls[i].markAsDirty();
      this.infoForm.controls[i].updateValueAndValidity();
    }
    let model = {
      ...this.infoForm.value
    }
    this.commentService.CreateComment(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.router.navigate(['comment/list-comment'])
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

}
