import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  email:any;
  userName:any;
  constructor(private jwtHelper: JwtHelperService, private accountService:AccountService ) { }

  ngOnInit() {
    this.GetTokenByName();
  }

  GetTokenByName() {
    var token = localStorage.getItem('currentUser')
    const tokenDecode = this.jwtHelper.decodeToken(token);
    if(tokenDecode != null) {
      this.email = tokenDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      this.accountService.GetByNameToken(this.email).subscribe((res:any) => {
        console.log(res);
        if(res.code == 200) {
           this.userName = res.data.userName
        }
      })
    }
  }
}
