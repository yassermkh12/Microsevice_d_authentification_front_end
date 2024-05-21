import {Component, inject} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {jwtDecode} from "jwt-decode";
import {routes} from "../../app.routes";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    NgForOf,
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  // isloggin : boolean = true;

  users : User[] = [];

  constructor(
    private userService : UserService,
    private router : Router,
  ){}

  token : any = localStorage.getItem('token');

  decodedToken = jwtDecode(this.token);
  username = this.decodedToken.sub

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.findAll().subscribe(
      user => {
        console.log(user);
        this.users = user;
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refrechToken')
    console.log("oui")
    this.router.navigate(["/login"]);
  }

  profile(){

  }



}
