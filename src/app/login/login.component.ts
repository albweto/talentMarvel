import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Location } from '@angular/common';
import { UserInterface } from '../models/user-interface';
import { isError } from 'util';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private authService: AuthService,private router: Router, private location: Location) { }
  private user: UserInterface = {
    username: '',
    password: ''
  };

  public isError = false;


  ngOnInit() {
  }


  onLogin(form: NgForm) {
    if (form.valid) {
       this.authService
        .loginuser(this.user.username, this.user.password)
        .subscribe(
        data => {
          this.authService.setUser(data);
          const token = data.id;
          this.authService.setToken(token);
          location.reload();
          this.router.navigate(['/']);
          this.isError = false;         
        },
        error => this.onIsError()
        );
    } else {
      this.onIsError();
    }
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
