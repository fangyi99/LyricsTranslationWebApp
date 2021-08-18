import { Injectable } from '@angular/core';
//import HttpClient and HttpHeaders for invoking HTTP requests
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service'; 

@Injectable()
export class SongListingService {
  //declare and initiate the accessPointUrl 
  private headers: HttpHeaders;
  //this URL should be amend to indicate port number and API URI accordingly
  private accessPointUrl: string = 'https://localhost:44366/api/songs';
  private ocelotGatewayUrl: string = "https://localhost:44382/gateway/songs";
  private translateUrl: string = 'https://api.cognitive.microsofttranslator.com/translate';

  constructor(private http: HttpClient, private auth:AuthService) { 
    //construct a header to ensure all requests are of json type and utf-8 charset
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  //create function to retrieve songs with eStoreService Web API end point
  public retrieveAllSongs(title:string, genre:string) {
    return this.http.get(this.accessPointUrl, {params: {title: title, genre: genre}});
  }

  public retrieveUserSongs(){
    return this.http.get(this.accessPointUrl + '/user-songs/' + this.auth.getUser(), {headers: this.headers});
  }

  public retrieveSongById(id:number){
    return this.http.get(this.accessPointUrl + '/' + id);
  }

  public addNewSong(payload){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
      })
    return this.http.post(this.ocelotGatewayUrl, payload, {headers: headers});
  }


  public deleteSongById(payload) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
      })
    return this.http.delete(this.ocelotGatewayUrl + '/' + payload.id, {headers: headers});
  }

  public updateSongById(payload) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
      })
    return this.http.put(this.ocelotGatewayUrl + '/' + payload.id, payload, {headers: headers});
  }

  public translateText(targetLanguage:string, textToTranslate:any) {
    return this.http.post(this.translateUrl + '?api-version=3.0&to=' + targetLanguage, textToTranslate,
    {headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '',
      'Ocp-Apim-Subscription-Region': 'southeastasia',
      'Content-Type':  'application/json; charset=utf-8',
    })});
  }
}
