import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private categoryService:CategoryService,private router:Router,private notification:NotificationService) { }

  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageBase64: string | null = null;

  // check dữ liệu liệu form
  infoForm = this.fb.group({
    "categoryName":["",[Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9]+$')]],
    "image":["",[Validators.required]],
    "status":true,
})

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


ngOnInit():void {
  this.onSubmit();
}

get f() {
  return this.infoForm.controls
}

onSubmit() {
    // đoạn này sẽ for check đièu kiện của form nếu không hợp lệ sẽ hiển thị ra lỗi
    for (const i in this.infoForm.controls) {
      this.infoForm.controls[i].markAsDirty();
      this.infoForm.controls[i].updateValueAndValidity();
    }

    let model = {
      ... this.infoForm.value,
      image : this.imageBase64
    }
    this.categoryService.CreateCategory(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.router.navigate(['category/list-category'])
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }
}
