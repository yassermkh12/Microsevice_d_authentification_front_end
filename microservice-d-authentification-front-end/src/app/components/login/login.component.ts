import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {AuthenticationRequest} from "../../models/authentication-request";
import {jwtDecode} from "jwt-decode";
import {Route, Router} from "@angular/router";
import {RecuperationService} from "../../services/recuperation.service";
import {NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  authenticationRequestForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(
    private authenticationService: AuthenticationService,
    private router : Router,
    private recuperationService : RecuperationService,
  ) {
  }

  formSubmitted: boolean = false;

  token = '';
  refrechToken = '';
  email: string = '';

  isModalHidden = false;

  i = 0;
  j = 0;

  iCode = 0;
  jCode = 0;

  iPassword = 0;
  jPassword = 0;

  toVerifyCode:any;
  toResetPassword : any;
  toMessage : any;

  validPassword="";
  errorPassword="";

  openEmailModal(){
      var openEmailModal = document.getElementById('openEmailModal');
      if (openEmailModal){
        // data-bs-toggle="modal" data-bs-target="#exampleModal"
        openEmailModal.setAttribute('data-bs-toggle','modal');
        openEmailModal.setAttribute('data-bs-target', '#exampleModal');
        openEmailModal.click();
        // openEmailModal.removeAttribute('data-bs-toggle');
        // openEmailModal.removeAttribute('data-bs-target');
      }

  }

  closeEmailModal(nameElement : string, nameCloseElement : string){
    const myElement = document.getElementById(nameElement);
      if (myElement) {
        const myElement2 = document.getElementById(nameCloseElement);
        if (myElement2){
          myElement2.setAttribute('data-bs-dismiss', 'modal');
          myElement2.click();
          myElement2.removeAttribute('data-bs-dismiss');
        }
      }
    }


  login() {
    this.formSubmitted = true;

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

          this.router.navigate(['/logout'])
        },
        error => {
          console.error('Erreur capturée dans le composant :', error);
          alert(error.message);
        }
      )
    }

  }

  forgotPassword(form:NgForm) {

    if (this.j < 1) {
      this.j = this.j + 1;
      this.formSubmitted = true;

      if (form.valid) {
        this.email = form.value.email
        console.log(this.email)

        this.recuperationService.forgotPassword(this.email).subscribe(
          response => {
            console.log("email est envoyer");
            var modalElement = document.getElementById('exampleModal');
            if (modalElement) {
              this.toVerifyCode = document.getElementById('btn-to-verify-code');
              console.log(this.toVerifyCode);
              if (this.toVerifyCode) {
                this.toVerifyCode.setAttribute('data-bs-target', '#exampleModalToggle');
                this.toVerifyCode.setAttribute('data-bs-toggle', 'modal');
                if (this.i < 1) {
                  this.i = this.i + 1;
                  this.toVerifyCode.click();
                }
                this.toVerifyCode.removeAttribute('data-bs-target');
                this.toVerifyCode.removeAttribute('data-bs-toggle');
              }
            }
          },
          error => {
            console.log(this.email)
            console.error(error.message);
            this.j = 0;
          }
        )
      }
    }
    if (this.toVerifyCode) {
      this.toVerifyCode.removeAttribute('data-bs-target');
      this.toVerifyCode.removeAttribute('data-bs-toggle');
    }
  }

  verifyCode(form:NgForm) {

    if (this.jCode < 1) {
      this.jCode = this.jCode + 1;
      this.formSubmitted = true;

      if (form.valid) {
        {
          var code = form.value.code
          console.log(code);
          console.log(this.email)
          this.recuperationService.verifyCode(this.email, code).subscribe(
            response => {
              console.log("code est envoyer");

              var modalElement = document.getElementById('exampleModalToggle');
              console.log(modalElement)
              if (modalElement) {
                this.toResetPassword = document.getElementById('btn-to-reset-password');
                console.log(this.toResetPassword);
                if (this.toResetPassword) {
                  this.toResetPassword.setAttribute('data-bs-target', '#exampleModalToggle2');
                  this.toResetPassword.setAttribute('data-bs-toggle', 'modal');
                  if (this.iCode < 1) {
                    this.iCode = this.iCode + 1;
                    this.toResetPassword.click();
                  }
                  this.toResetPassword.removeAttribute('data-bs-target');
                  this.toResetPassword.removeAttribute('data-bs-toggle');
                }
              }

            },
            error => {
              console.error(error.message);
              this.jCode = 0;
            }
          )
        }
      }
    }
    if (this.toResetPassword) {
      this.toResetPassword.removeAttribute('data-bs-target');
      this.toResetPassword.removeAttribute('data-bs-toggle');
    }
  }


  resetPassword(form:NgForm) {

    if (this.jPassword < 1) {
      this.jPassword = this.jPassword + 1;
      this.formSubmitted = true;

      if (form.valid) {
        {
          var password = form.value.password
          console.log(password);
          console.log(this.email)
          this.recuperationService.resetPassword(this.email, password).subscribe(
            response => {
              console.log("password est envoyer");
              this.validPassword = "password est envoyer";

              var modalElement = document.getElementById('exampleModalToggle2');
              if (modalElement) {
                this.toMessage = document.getElementById('btn-to-message');
                if (this.toMessage) {
                  this.toMessage.setAttribute('data-bs-toggle', 'modal');
                  this.toMessage.setAttribute('data-bs-target', '#passwordValid');
                  if (this.iPassword < 1) {
                    this.iPassword = this.iPassword + 1;
                    this.toMessage.click();
                  }
                }
              }
            },
            error => {
              console.error(error.message);
              this.errorPassword = error.message;
              this.jPassword = 0;

              var modalElement = document.getElementById('exampleModalToggle2');
              if (modalElement) {
                this.toMessage = document.getElementById('btn-to-message');
                if (this.toMessage) {
                  this.toMessage.setAttribute('data-bs-toggle', 'modal');
                  this.toMessage.setAttribute('data-bs-target', '#passwordNotValid');
                  if (this.iPassword < 1) {
                    this.iPassword = this.iPassword + 1;
                    this.toMessage.click();
                  }
                }
              }
            }
          )
        }
      }
    }
    if (this.toMessage) {
      this.toMessage.removeAttribute('data-bs-target');
      this.toMessage.removeAttribute('data-bs-toggle');
    }
  }
}
// data-bs-toggle="modal" data-bs-target="#passwordValid"
