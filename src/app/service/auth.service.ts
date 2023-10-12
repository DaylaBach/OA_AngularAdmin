import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor() { }

  IsLoggedIn() {
    var local = JSON.parse(localStorage.getItem('currentUser'))
    if(local == null) {
      return false;
    }
    var token = local.token;
    if(token != null) {
      return true;
    }
  }
}
