import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email:any;
  userName:any;
  constructor(private jwtHelper: JwtHelperService,private router:Router, private accountService:AccountService ) { }

  ngOnInit() {
    this.GetTokenByName();
  }

  GetTokenByName() {
    var token = localStorage.getItem('currentUser')
    const tokenDecode = this.jwtHelper.decodeToken(token);
    if(tokenDecode != null) {
      this.email = tokenDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      this.accountService.GetByNameToken(this.email).subscribe((res:any) => {
        if(res.code == 200) {
           this.userName = res.data.userName
        }
      })
    }
  }

  Logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['Medlatec/login'])
  }
}
