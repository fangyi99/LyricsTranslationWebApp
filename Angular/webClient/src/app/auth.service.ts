import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string = 'user'
  role: string = 'role'
  token: string = 'jwt-token'

  constructor(private router:Router) { }

  //get user details from login form
  setToken(user:string, role:string, token: string){
    localStorage.setItem(this.user, user);
    localStorage.setItem(this.role, role);
    localStorage.setItem(this.token, token);
  }

  // for directing to account details page
  getUser(){
    return localStorage.getItem(this.user);
  }

  getToken(){
    return localStorage.getItem(this.token);
  }

  isLoggedIn(){
    if(this.getToken()!=null){
      return true;
    }
    else{
      return false;
    }
    
  }

  // check if user is admin to view all accounts
  isAuthorised(){
    if(localStorage.getItem(this.role) == "admin"){
      return localStorage.getItem(this.role);
    }
    else{
      return false;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['44355/api/accounts/login']);
  }
}
