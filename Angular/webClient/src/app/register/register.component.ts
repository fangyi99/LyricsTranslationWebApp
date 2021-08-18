import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, EmailValidator } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg";
  Role : FormControl = new FormControl();

  formModel = this.fb.group({
    Role: this.Role,
    Username: ['',Validators.required],
    Email: ['',Validators.email],
    Passwords: this.fb.group({
      Password: ['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['',Validators.required]
    },{validator: this.comparePasswords})
  })

  constructor(public accountService: AccountService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  onItemChange(value){
    return value;
 }

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  onSubmit(form:NgForm){

    var credentials:any;

    if(form.value.Email == ''){
      credentials = {
      Role: form.value.Role,
      Username: form.value.Username,
      Password: form.value.Passwords.Password
    }
  }
    else{
      credentials = {
        Role: form.value.Role,
        Username: form.value.Username,
        Email: form.value.Email,
        Password: form.value.Passwords.Password
    }
    }

    this.accountService.register(credentials).subscribe(
      (res:any) => {
          this.formModel.reset();
          console.log("Registeration successful");
          alert("Registeration successful");
      },(err:any) => {
        console.log(JSON.stringify(err.error.message));
        alert(JSON.stringify(err.error.message));
      })
  }
}
