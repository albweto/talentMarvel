import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http' ; 
import { Observable } from 'rxjs/internal/Observable';
import { map }from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import { UserInterface} from  '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });


  loginuser(username: string , password: string){
    const url_api = "http://localhost:8080/account/login"; 
    return this.http
    .post<UserInterface>(url_api,{username,password},{headers: this.headers})
    .pipe(map(data => data));
  }


  setUser(user:UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser",user_string);
  }

  setToken(token: string):void{
    localStorage.setItem("accesToken",token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }


  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }


  logoutUser(){
    let acces_token = localStorage.getItem("accessToken");
    const url_api = `http://localhost:8080/logout`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<UserInterface>(url_api, {headers : this.headers});

  }
}
