import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const refrechToken = localStorage.getItem('refrechToken');

  if((token != null || refrechToken != null) ){
    router.navigate(['/logout']);
    return false;
  }
  return true;
};
