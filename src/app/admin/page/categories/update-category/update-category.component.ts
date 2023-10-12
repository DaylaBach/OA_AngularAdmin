import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private categoryService : CategoryService, private aRoute:ActivatedRoute) { }
  categoryId = this.aRoute.snapshot.paramMap.get("categoryId");
  category = []

  ngOnInit() {
    this.GetCategoryById();
  }

  infoForm = this.fb.group({
    "categoryName":["",[Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9]+$')]],
    "fileImage":[],
    "image":["image"],
    "status":true,
  })

  GetCategoryById() {
    this.categoryService.GetCategoryById(this.categoryId).subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.category = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.category = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.category = [];
      }
    })
  }

}
