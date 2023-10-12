import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/service/notification.service';
import { OrganizationLegalService } from 'src/app/service/organization-legal.service';

@Component({
  selector: 'app-organization-legal',
  templateUrl: './organization-legal.component.html',
  styleUrls: ['./organization-legal.component.css']
})
export class OrganizationLegalComponent implements OnInit {
  constructor(private fb:FormBuilder,private notification:NotificationService,private jwtHelper: JwtHelperService,private organizationlegal:OrganizationLegalService) { }
  listLogOrganizations = []
  listStatus = [];
  // search
  p:number = 1;
  pageSize:number = 20;
  message:any;
  checkAuthen:boolean = true;

  infoForm = this.fb.group({
    "unitId":["",
    [Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z0-9]+$')]
  ],
    "brandName":["",[Validators.required,Validators.maxLength(500)]],
    "status":[""]
  });

  get f() {
    return this.infoForm.controls
  }


  myGroup = this.fb.group({
    "unitId":[this.GetUnitId()],
    "status":[""],
    "name":[""]
  })

  formDetail = this.fb.group({
    "unitId":"",
    "description":"",
    "status":"",
    "createdDate":"",
    "updatedDate":""
  });

  formUpdate = this.fb.group({
    "unitId":["",
    [Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z0-9]+$')]
    ],
    "description":["",[Validators.required,Validators.maxLength(500)]],
    "status":[""]
  })

  get u() {
    return this.formUpdate.controls
  }


  ngOnInit() {
    this.GetUnitId();
    this.GetListStatusOrganizationlegal();
    this.GetListDataUnitId();
  }

    // hàm lấy unitId của đơn vị
    GetUnitId() {
      var token = localStorage.getItem('currentUser')
      const tokenDecode = this.jwtHelper.decodeToken(token);
      if(tokenDecode != null) {
        var unitId = tokenDecode.sub[1].Value;
        return unitId;
      }
    }

     // hàm lấy ra danh sách trạng thái
    GetListDataUnitId() {
      var checkStatus = this.myGroup.controls.status.value;
      if(checkStatus == "") {
        checkStatus = null;
      }
      let model= {
        ...this.myGroup.value,
        status: checkStatus,
      }
      this.organizationlegal.GetListStatusOrganization(model).subscribe((res:any) => {
        console.log(res);
        if(res.code == 200) {
          this.listLogOrganizations = res.data
        }
        if(res.code === 400) {
          this.listLogOrganizations = [];
          this.notification.showError(res.message,"Error");
        }
        if(res.code === 403) {
          this.listLogOrganizations = [];
          this.message = res.message;
          this.checkAuthen = false;
        }
        if(res.code === 500) {
          this.listLogOrganizations = [];
          this.notification.showSuccess("Lấy dữ liệu thành công","Success");
        }
      })
    }

    GetListStatusOrganizationlegal() {
      this.organizationlegal.GetListStatusOrganizationlegal().subscribe((res:any) => {
        console.log(res);
        if(res) {
          this.listStatus = res.data
        }
      })
    }

    onSubmitFromCreate(event) {
       // đoạn này sẽ for check đièu kiện của form nếu không hợp lệ sẽ hiển thị ra lỗi
       for (const i in this.infoForm.controls) {
        this.infoForm.controls[i].markAsDirty();
        this.infoForm.controls[i].updateValueAndValidity();
      }

      if (!this.infoForm.valid) {
        event.stopPropagation()
        return;
      }

      var checkStatus= this.infoForm.controls.status.value;
      if(checkStatus == 'true') {
        checkStatus = "1"
      }else{
        checkStatus = null
      }

      let model = {
        ...this.infoForm.value,
        status: checkStatus
      }

      this.organizationlegal.CreateUnit(model).subscribe((res:any) => {
        console.log(res);
        if(res.code == 200) {
          this.GetListDataUnitId();
          this.notification.showSuccess(res.message,"Success");
        }
        if(res.code === 400) {

          this.notification.showError(res.message,"Error");
        }
        this.infoForm.reset()
      })
    }


    ShowUnitDetail(unitId:any) {
      this.organizationlegal.findById(unitId).subscribe((res:any) => {
        console.log(res)
        var data = res.data;
        for(var item of data) {
          this.formDetail = this.fb.group({
            "unitId":[`${item.unitID}`],
            "description":[`${item.description}`],
            "status":[`${item.active == 0?'Tạm khóa':'Kích hoạt'}`],
            "createdDate":[`${item.insertTime}`],
            "updatedDate":[`${item.updateTime}`]
          })
        }
      })
    }
     check:any = false;

    ShowUpdate(unitId:any) {
      this.GetListStatusOrganizationlegal()
      this.organizationlegal.findById(unitId).subscribe((res:any) => {
        console.log(res);
        var data = res.data;
        for(var item of data) {
          this.formUpdate = this.fb.group({
            "unitId":[`${item.unitID}`],
            "description":[`${item.description}`],
            "status":[`${item.active}`],
          })
        }
      })
    }

    onSubmitFromUpdate(event) {
        // đoạn này sẽ for check đièu kiện của form nếu không hợp lệ sẽ hiển thị ra lỗi
        for (const i in this.infoForm.controls) {
          this.infoForm.controls[i].markAsDirty();
          this.infoForm.controls[i].updateValueAndValidity();
        }

        if (!this.formUpdate.valid) {
          event.stopPropagation()
          return;
        }
        this.organizationlegal.UpdateUnit(this.formUpdate.value).subscribe((res:any) => {
          console.log(res);
          if(res == true) {
            this.GetListDataUnitId();
            this.notification.showSuccess("Cập nhật thành công","Success");
          }else{
            this.notification.showError("Cập nhật thất bại","Error");
          }
        })
    }


    onReset2(event) {
    this.infoForm.reset()
    }

    onSubmit() {
      this.GetListDataUnitId();
    }

    onChange(sizeValue) {
      this.pageSize = sizeValue
    }

    Search() {
      var name = this.myGroup.controls.name.value;
      if(name == "") {
        this.ngOnInit();
      }else{
        this.listLogOrganizations = this.listLogOrganizations.filter(res => {
          return res.description.toLocaleLowerCase().match(name.toLocaleLowerCase());
        })
      }
    }
      // hàm sắp xếp
      key : string =  'id';
      reverse: boolean = false;
      sortby(key){
        this.key = key;
        this.reverse = !this.reverse;
      }

}
