import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

export const auhtenticationGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token : any = localStorage.getItem('token');
  const refrechToken :any = localStorage.getItem('refrechToken');

  const decodedToken = jwtDecode(token);
  const time : any = decodedToken.exp
  console.log("time d expiration ", time);

  const currentTime: number = Math.floor(Date.now() / 1000);
  console.log("current time", currentTime);

  // if((token == null || refrechToken == null || currentTime >= time ) ){
  //   router.navigate(['/roles']);
  //   // return false;
  // }
  // router.navigate(['/roles']);
  return true;
}
