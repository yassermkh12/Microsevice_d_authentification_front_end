import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {RoleService} from "./services/role.service";
import {AuthenticationService} from "./services/authentication.service";
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[AuthenticationService,UserService,RoleService]
})
export class AppComponent{

}
