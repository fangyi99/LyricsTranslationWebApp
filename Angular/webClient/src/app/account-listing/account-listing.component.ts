import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-listing',
  templateUrl: './account-listing.component.html',
  styleUrls: ['./account-listing.component.css']
})
export class AccountListingComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg";
  profilePic : string = "/assets/images/profile-pic.png";
  public accountList: Array<any>;

  constructor(public accountService: AccountService, public auth: AuthService, public router: Router) { 
    accountService.retrieveAllAccounts().subscribe((data: any) => this.accountList = data);
  }

  ngOnInit(): void {
  }

  public viewProfile()
  {
    console.log(this.auth.getUser());
    this.router.navigateByUrl('/44382/gateway/accounts/'+ this.auth.getUser());
  }

  public viewCreatedSongs(){
    console.log(this.auth.getUser());
    this.router.navigate(['/user-songs/'+ this.auth.getUser()]);
  }
  
  public logout(){
    this.auth.logout();
  }

}
