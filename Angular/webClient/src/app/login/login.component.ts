import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg"
  data: string;

  formModel = {
    Username: '',
    Password: ''
  }

  constructor(private accountService: AccountService, private auth: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/44382/gateway/accounts/' + this.auth.getUser()]);
    }
  }

  onSubmit(form:NgForm){
    this.accountService.login(form.value).subscribe((res:any) => {
      this.auth.setToken(form.value.Username, res.accountDetails.result.value.role, res.token);
      this.router.navigate(['/44382/gateway/accounts/' + this.auth.getUser()]);
    },(err:HttpErrorResponse) => {
      alert("Invalid username or password.");
    })
  }
}

