import { Injectable } from '@angular/core';
//import HttpClient and HttpHeaders for invoking HTTP requests
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; 

@Injectable()
export class AccountService {
  //declare and initiate the accessPointUrl 
  private headers: HttpHeaders;
  //this URL should be amend to indicate port number and API URI accordingly
  private accessPointUrl: string = 'https://localhost:44355/api/accounts';
  private ocelotGatewayUrl: string = "https://localhost:44382/gateway/accounts";

  constructor(private http: HttpClient, private auth:AuthService) { 
    //construct a header to ensure all requests are of json type and utf-8 charset
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public login(formData){
    return this.http.post(this.accessPointUrl + '/login', formData);
  }

  public register(formData){
    return this.http.post(this.accessPointUrl + '/register', formData);
  }

  public retrieveAllAccounts() {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.auth.getToken()
    })
    return this.http.get(this.ocelotGatewayUrl, {headers: headers});
  }

  public retrieveAccountByUsername(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
      })
    return this.http.get(this.ocelotGatewayUrl + '/' + this.auth.getUser(), {headers: headers});
  }

    public deleteAccountById(payload) {
      return this.http.delete(this.accessPointUrl + '/' + payload.id, 
      {headers: this.headers});
    }
  
    public updateAccountById(payload) {
      return this.http.put(this.accessPointUrl + '/' + payload.id, payload,
      {headers: this.headers});
    }
  
}