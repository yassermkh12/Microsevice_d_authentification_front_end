import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { RecuperationSecurityService } from '../../../services/recuperation-security.service';
import { NavbarComponent } from '../../tools/navbar/navbar.component';
import { Role } from '../../../models/role';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-get-role',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './get-role.component.html',
  styleUrl: './get-role.component.css'
})
export class GetRoleComponent implements OnInit{

  roles : Role[] = [];
  role : any;
  
  constructor(
    private roleService : RoleService ,
    private router : Router,
    private userService : UserService,
    private recuperationService : RecuperationSecurityService
  ){
  }

  token : any = localStorage.getItem('token');
  refrechToken : any = localStorage.getItem('refrechToken')

  decodedToken = jwtDecode<JwtPayload>(this.token);
  username:string| undefined = this.decodedToken.sub

  rolesToken : any = this.decodedToken.role.map(roleObj => roleObj.authority);

  roleIndication : boolean = true;

  ngOnInit(): void{
    this.getRoles();
  }

  getRoles(){
    this.roleService.findAll().subscribe(
      role => {
        console.log("les roles sont : ", role);
        this.roles = role
      }
    )
  }

  roleAuthorisation(){
    if (this.rolesToken.includes('ADMIN')){
      console.log("les roles sont exacte (ADMIN)")
    } else{
      console.log("les roles ne sont pas exacte !!!! (PAS D ADMIN)")
    }
  }

}
interface JwtPayload {
  role:{ authority: string }[]; // Assurez-vous que cela correspond à la structure de votre JWT
  // Autres propriétés selon votre JWT
   sub: string,
  iat: number,
  exp: number
}
