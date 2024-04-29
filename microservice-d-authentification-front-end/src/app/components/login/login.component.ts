// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../models/authentication-request";
import {jwtDecode} from "jwt-decode";
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  authenticationRequestForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authenticationService: AuthenticationService, private userService : UserService,
  ) {
  }

  formSubmitted: boolean = false;

  token = '';
  refrechToken = '';

  login() {
    // this.formSubmitted = true;

    if (this.authenticationRequestForm.valid) {
      const authenticationRequest: AuthenticationRequest = {
        username: this.authenticationRequestForm.value.username,
        password: this.authenticationRequestForm.value.password
      }


      this.authenticationService.authenticate(authenticationRequest).subscribe(
        authResponse => {

          this.token = authResponse.token
          localStorage.setItem('token', this.token);
          this.refrechToken = authResponse.refrechToken;
          localStorage.setItem('refrechToken', this.refrechToken);
          console.log("token : ", this.token);
          console.log("refrech token : ", this.refrechToken);

          const decodedToken = jwtDecode(this.token);
          console.log("decode token : ", decodedToken)
          const username = decodedToken.sub
          console.log("username : ", username)
        }
      )
    }

  }



}
