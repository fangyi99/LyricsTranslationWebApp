import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg"
  profilePic : string = "/assets/images/profile-pic.png"
  account: any;
  updateAccountForm: FormGroup;

  constructor(public accountService: AccountService, public auth: AuthService, private formBuilder: FormBuilder, private router: Router) {
    accountService.retrieveAccountByUsername().subscribe((data: any) => this.account = data);
   }

  ngOnInit(): void {

    this.updateAccountForm = this.formBuilder.group({
      id: [''],
      role: [''],
      username: [''],
      email: ['',Validators.email],
      password: ['', Validators.required]
    });
  }

  public viewAllAccounts(){
    this.router.navigateByUrl('/44382/gateway/accounts');
  }

  public viewCreatedSongs(){
    this.router.navigate(['/user-songs/'+ this.auth.getUser]);
  }

  public onDelete(){
    this.accountService.deleteAccountById(this.account).subscribe(res => {
      console.log('Account Deleted');
      this.auth.logout();
      this.router.navigate(['44355/api/accounts/login']);
    })
  }

  public onUpdateModal(account) {
    this.updateAccountForm.patchValue(account);
  }

  public onUpdate(){
    var credentials:any;

    if(this.updateAccountForm.value.email == ''){
      credentials = {
      id: this.updateAccountForm.value.id,
      role: this.updateAccountForm.value.role,
      username: this.updateAccountForm.value.username,
      password: this.updateAccountForm.value.password
    }
  }
    else{
      credentials = {
        id: this.updateAccountForm.value.id,
        role: this.updateAccountForm.value.role,
        username: this.updateAccountForm.value.username,
        email: this.updateAccountForm.value.email,
        password: this.updateAccountForm.value.password
    }
    }
    
    this.accountService.updateAccountById(credentials).subscribe(res => {
      console.log('Profile Updated');
      this.accountService.retrieveAccountByUsername().subscribe((data: any) => this.account = data);
      location.reload;
    }) }

  public logout(){
    this.auth.logout();
  }
    
}
