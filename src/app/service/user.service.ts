import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserInterface } from '../models/user-interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });


  saveUser(email:string , password: string , username: string, nombre: string, apellido: string){
    const url_api = "http://localhost:8080/account/saveOrupdate";
    return this.http.post<UserInterface>(url_api,{
      nombre : nombre,
      apellido: apellido,
      email: email,
      password: password,
      username: username
    },{headers: this.headers})
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
}
