import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../models/authentication-request";
import {jwtDecode} from "jwt-decode";
import {PaginatorModule} from "primeng/paginator";
import {RegisterRequest} from "../../models/register-request";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerRequestForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  constructor(
    private autheticationService: AuthenticationService,
    private router : Router
  ) {
  }

  formSubmitted: boolean = false;

  token = '';
  refrechToken = '';
  usernameResponse ='';

  register(){
    this.formSubmitted = true;

    if (this.registerRequestForm.valid) {
      const registerRequest: RegisterRequest = {
        username: this.registerRequestForm.value.username,
        password: this.registerRequestForm.value.password,
        email: this.registerRequestForm.value.email
      }

      this.autheticationService.register(registerRequest).subscribe(
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

          this.router.navigate(['/logout'])
        },
        error => {
          console.error('Erreur capturée dans le composant :', error);
          alert(error.message);
        }
      )

    }
  }
}
