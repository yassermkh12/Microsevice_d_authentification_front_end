import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[UserService]
})
export class AppComponent implements OnInit{

  constructor(
    private userService: UserService
  ) {}


  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.findAll().subscribe(
      (users: User[]) => {
        console.log(users);
      }
    )
  }

}
