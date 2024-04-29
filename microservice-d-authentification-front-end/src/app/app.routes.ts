import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";

const loginComponent = LoginComponent;

export const routes: Routes = [
  { path: 'login', component: loginComponent },
]
