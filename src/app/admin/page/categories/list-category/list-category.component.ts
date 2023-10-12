import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private categoryService : CategoryService) { }
  listCategory = [];
  p:number = 1;
  pageSize:number = 10;
  message:any;
  fileName= 'ExcelSheet.xlsx';

  image: any;
  selectedFile: File;
  selectedImage: string | ArrayBuffer | null = null;
  imageold:string;
  imageBase64: string | null = null;
  eventOccurred: boolean = true;


  formDetail = this.fb.group({
    "image" : "",
    "categoryId" : "",
    "categoryName" :"",
    "status" :"",
    "createdDate":"",
    "updatedDate" : "",
  });

  formUpdate = this.fb.group({
    "categoryId" : "",
    "categoryName" :"",
    "status" :"",
    "image" : "",
    "createdDate":"",
    "updatedDate" : "",

  })

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

  ngOnInit() {
    this.GetAllCategory();
  }

  GetAllCategory() {
    this.categoryService.GetListCategory().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listCategory = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.status == 403) {
        this.listCategory = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listCategory = [];
      }
    })
  }

  ShowCateDetail(cateid:any) {
    this.categoryService.GetCategoryById(cateid).subscribe((res:any) =>{
      console.log(res)
      this.formDetail = this.fb.group({
        "categoryId":[`${res.data.categoryId}`],
        "categoryName" : [`${res.data.categoryName}`],
        "status" : [`${res.data.status == true ? 'kích hoạt' : 'chưa kích hoạt'}`],
        "image" :  [`${res.data.image}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],

      })
      this.image = this.formDetail.controls.image.value
    })
  }

  ShowFormUpdateDetail(cateId:any) {
    this.categoryService.GetCategoryById(cateId).subscribe((res:any) =>{
      console.log(res)
      this.formUpdate = this.fb.group({
        "categoryId":[`${res.data.categoryId}`],
        "categoryName" : [`${res.data.categoryName}`],
        "status" : [`${res.data.status}`],
        "imageold" :  [`${res.data.image}`],
        "createdDate" : [`${res.data.createdDate}`],
        "updatedDate" : [`${res.data.updatedDate}`],
      })
      this.imageold = this.formUpdate.controls.imageold.value
    })
  }

  DeleteCategory(id){
    if(confirm("Are you sure?")){
      this.categoryService.DeleteCategory(id).subscribe((res:any) => {
        console.log(res)
        if(res.code == 200) {
          this.notification.showSuccess(res.message,"Success");
          this.GetAllCategory()
        }else if(res.code == 403) {
          this.listCategory = [];
          this.router.navigate(['/page/forbidden']);
        }else{
          this.listCategory = [];
        }
      })
    }
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
    this.categoryService.UpdateCategory(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.GetAllCategory()
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }


  onChange(sizeValue) {
    this.pageSize = sizeValue
  }

  onChanges(sortValue) {
    this.categoryService.SortByCategory(sortValue).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.listCategory = res.data;
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
