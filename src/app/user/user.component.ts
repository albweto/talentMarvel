import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../models/user-interface';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public isError = false;
  public msgError = '';

  private user: UserInterface = {
    
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    email: ''
  };
  constructor(private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  onRegister(form: NgForm): void {
    if (form.valid) {
      this.userService
        .saveUser(this.user.email,this.user.password,this.user.apellido,this.user.nombre, this.user.username)
        .subscribe(user => {
          this.userService.setUser(user);
          const token = user.id;
          this.userService.setToken(token);
          this.router.navigate(['/home']);
          location.reload();
        },
        res => {
          this.msgError = res.error.error.details.messages.email;
          this.onIsError();
        });
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
