import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public app_name = 'Sistema_Prueba';
  public isLogged = false;
  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit() {
    this.onCheckUser();
  }

  onLogout(): void {
    this.authService.logoutUser();
    location.reload();
  }

  onCheckUser(): void {
    if (this.authService.getCurrentUser() == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }

}
