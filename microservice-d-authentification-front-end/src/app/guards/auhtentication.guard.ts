import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

export const auhtenticationGuard: CanActivateFn = (route, state) => {
  const isloggin : Boolean = true;

  const router = inject(Router);

  const token : any = localStorage.getItem('token');
  const refrechToken :any = localStorage.getItem('refrechToken');

  const decodedToken = jwtDecode(refrechToken);
  const time : any = decodedToken.exp


  const currentTime: number = Math.floor(Date.now() / 1000);

  if((token == null || refrechToken == null || currentTime >= time ) ){
    router.navigate(['/login']);
    return false;
  }
  return true;
}
