import {Component, inject} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {jwtDecode} from "jwt-decode";
import {routes} from "../../app.routes";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {RecuperationService} from "../../services/recuperation.service";
import {RecuperationSecurityService} from "../../services/recuperation-security.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    NgForOf,
    RouterOutlet,
    RouterLink,
    NgIf,
    FormsModule
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  // isloggin : boolean = true;
  formSubmitted: boolean = false;

  users : User[] = [];
  user : any;

  email = '';

  toVerifyCode:any;
  toResetPassword : any;
  toMessage : any;

  errorPassword = '';
  validPassword = '';

  i = 0;
  j = 0;

  iCode = 0;
  jCode = 0;

  iPassword = 0;
  jPassword = 0;

  constructor(
    private userService : UserService,
    private router : Router,
    private recuperationService : RecuperationSecurityService
  ){}

  token : any = localStorage.getItem('token');

  decodedToken = jwtDecode(this.token);
  username:string| undefined = this.decodedToken.sub

  ngOnInit(): void {
    this.getUser();
    this.getUserByEmail();
  }

  getUser(){
    this.userService.findAll().subscribe(
      user => {
        console.log(user);
        this.users = user;
      }
    )
  }

  getUserByEmail(){
    this.userService.findUserByUsername(this.username).subscribe(
      user => {
        console.log(user);
        this.email = user.email;
      }
    )
    // this.userService.findUserByEmail(email).subscribe(
    //   user => {
    //     console.log(user);
    //     this.user = user;
    //   }
    // )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refrechToken')
    console.log("oui")
    this.router.navigate(["/login"]);
  }

  profile(){

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

  forgotPassword(form:NgForm) {

    if (this.j < 1) {
      this.j = this.j + 1;
      this.formSubmitted = true;

      if (form.valid) {
        console.log(this.email)
        this.recuperationService.forgotPassword(this.email).subscribe(
          response => {
            console.log("email est envoyer");
            var modalElement = document.getElementById('resetPassword');
            if (modalElement) {
              this.toVerifyCode = document.getElementById('btn-to-verify-code');
              console.log(this.toVerifyCode);
              if (this.toVerifyCode) {
                this.toVerifyCode.setAttribute('data-bs-target', '#verifyCode');
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

              var modalElement = document.getElementById('verifyCode');
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
