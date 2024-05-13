import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {auhtenticationGuard} from "./guards/auhtentication.guard";
import {RegisterComponent} from "./components/register/register.component";
import {loginGuard} from "./guards/login.guard";

const loginComponent = LoginComponent;

export const routes: Routes = [
  { path: 'login', component: loginComponent, canActivate:[loginGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'logout',component: LogoutComponent, canActivate:[auhtenticationGuard]}
]
