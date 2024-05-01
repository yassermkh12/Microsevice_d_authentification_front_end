import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {RoleService} from "./services/role.service";
import {AuthenticationService} from "./services/authentication.service";
import {LoginComponent} from "./components/login/login.component";
import {CommonModule} from "@angular/common";
import {LogoutComponent} from "./components/logout/logout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, HttpClientModule, LoginComponent, RouterLink, LogoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',


})
export class AppComponent{
}
