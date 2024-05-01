import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {auhtenticationGuard} from "./guards/auhtentication.guard";

const loginComponent = LoginComponent;

export const routes: Routes = [
  { path: 'login', component: loginComponent },
  { path: 'logout',component: LogoutComponent, canActivate:[auhtenticationGuard]}
]
