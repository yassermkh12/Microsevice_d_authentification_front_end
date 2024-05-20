import {ApplicationConfig} from '@angular/core';
import {provideRouter, RouterLink, RouterModule} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {multicast} from "rxjs";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {RoleService} from "./services/role.service";
import {authenticationInterceptor} from "./interceptors/authentication.interceptor";
import {Router} from "express";
import {FormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([authenticationInterceptor])),
    AuthenticationService,
    UserService,
    RoleService,
    RouterLink,
    RouterModule,
    FormsModule
  ],
};
