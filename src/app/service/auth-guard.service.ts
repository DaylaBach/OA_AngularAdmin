import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(private authService:AuthService,private router:Router) { }


  canActivate() {
    var checkToken = this.authService.IsLoggedIn();
    if(checkToken) {
      return true;
    }
    this.router.navigate(['Medlatec/login'])
      return false;
  }
}
