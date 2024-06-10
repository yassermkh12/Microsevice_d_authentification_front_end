import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core"
import {jwtDecode} from "jwt-decode"


export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // const token : String|null = localStorage.getItem('token');
  // const refrechToken : String|null  = localStorage.getItem('refrechToken');

  // if((token != null || refrechToken != null) ){
  //   router.navigate(['/logout']);
  //   return false;
  // }
  return true;
};
