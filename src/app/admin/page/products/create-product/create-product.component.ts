import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private fb:FormBuilder, private productService:ProductService, private categoryService:CategoryService, private router:Router, private notification:NotificationService) { }
  listCategory=[];
  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageBase64: string | null = null;
  editorContent = '';


  ngOnInit() {
    this.GetAllCategory();
    this.onSubmit();
  }

  infoForm = this.fb.group({
    "productName":["",[Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z0-9]+$')]],
    "quantity":["",[Validators.required]],
    "price":["",[Validators.required]],
    "salePrice":["",[Validators.required]],
    "address":["", [Validators.required]],
    "status":true,
    "description":["",[Validators.required]],
    "image":["",[Validators.required]],
    "categoryId":["", [Validators.required]]
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

get f() {
  return this.infoForm.controls
}

GetAllCategory() {
  this.categoryService.GetListCategory().subscribe((res:any) => {
    console.log(res);
    if(res.code == 200) {
      this.listCategory = res.data;
    }else if(res.code == 403) {
      this.listCategory = [];
      this.router.navigate(['/page/forbidden']);
    }
  })
}

onEditorChange(eventData: any) {
  this.editorContent = eventData;
}

onSubmit(){
  for (const i in this.infoForm.controls) {
    this.infoForm.controls[i].markAsDirty();
    this.infoForm.controls[i].updateValueAndValidity();
  }
  let model = {
    ...this.infoForm.value,
    image : this.imageBase64,
  }
  this.productService.CreateProduct(model).subscribe((res:any)=>{
    console.log(res);
    if(res.code == 200) {
      this.router.navigate(['product/list-product'])
      this.notification.showSuccess(res.message,"Success")
    }else{
      this.notification.showError(res.message,"Error")
    }
  })
}
}
