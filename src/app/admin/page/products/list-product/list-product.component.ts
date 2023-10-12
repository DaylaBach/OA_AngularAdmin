import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private productService:ProductService, private categoryService:CategoryService) { }
  listProduct = [];
  listCategory = [];
  p:number = 1;
  pageSize = 20;
  message:any;
  fileName = 'ExcelSheet.xlsx';

  image: any;
  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageold:string;
  imageBase64: string | null = null;
  eventOccurred: boolean = true;
  editorContent = '';

  formDetail = this.fb.group({
    "image" : "",
    "productId" : "",
    "productName" :"",
    "quantity": "",
    "price" : "",
    "salePrice" : "",
    "status" :"",
    "categoryId":"",
    "description" : "",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "image" : "",
    "productId" : "",
    "categoryName":"",
    "productName" :"",
    "quantity": "",
    "price" : "",
    "salePrice" : "",
    "status" :"",
    "categoryId":"",
    "createdDate":'',
    "updatedDate" : '',
    "description" : "",

  })

  ngOnInit() {
    this.getAllProduct();
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

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.eventOccurred = false;
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

  getAllProduct() {
    this.productService.GetListProducr().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listProduct = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listProduct = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listProduct = [];
      }
    })
  }

  ShowProDetail(proId:any) {
    this.productService.GetProductById(proId).subscribe((res:any) =>{
      console.log(res)
      this.formDetail = this.fb.group({
        "image" :  [`${res.data.image}`],
        "productId" : [`${res.data.productId}`],
        "productName" :[`${res.data.productName}`],
        "price" : [`${res.data.price}`],
        "salePrice" : [`${res.data.salePrice}`],
        "quantity": [`${res.data.quantity}`],
        "status" : [`${res.data.status == true ? 'kích hoạt' : 'chưa kích hoạt'}`],
        "categoryId":[`${res.data.category.categoryName}`],
        "description" : [`${res.data.description}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
      this.image = this.formDetail.controls.image.value
    })
  }

  ShowFormUpdateDetail(proId:any) {
    this.GetAllCategory();
    this.productService.GetProductById(proId).subscribe((res:any) =>{
      console.log(res)
      this.formUpdate = this.fb.group({
        "categoryId":[`${res.data.categoryId}`],
        "status" : [`${res.data.status}`],
        "image" :  [`${res.data.image}`],
        "productId" : [`${res.data.productId}`],
        "productName" :[`${res.data.productName}`],
        "quantity": [`${res.data.quantity}`],
        "price" : [`${res.data.price}`],
        "salePrice" : [`${res.data.salePrice}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
        "description" : [`${res.data.description}`],
      })
      this.imageold = this.formUpdate.controls.image.value
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
    var checkStatus = this.formUpdate.controls.status.value;
    if(checkStatus == "true") {
      checkStatus = true;
    }else{
      checkStatus = false;
    }
    let model = {
      ...this.formUpdate.value,
      status : checkStatus,
      updatedDate : new Date(),
      image : this.imageBase64
    }
    this.productService.UpdateProduct(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.getAllProduct()
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }

  DeleteProduct(id){
    if(confirm("Are you sure?")){
      this.productService.DeleteProduct(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.getAllProduct()
        }else if(res.code == 403) {
          this.listProduct = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listProduct = [];
        }
      })
    }
  }

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  onChanges(sortValue) {
    this.productService.SortByProduct(sortValue).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.listProduct = res.data;
      }else{
        this.notification.showError(res.message,"Error")
      }
    });
  }

  onEditorChange(eventData: any) {
    this.editorContent = eventData;
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
