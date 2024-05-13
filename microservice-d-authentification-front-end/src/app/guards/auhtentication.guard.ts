import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const auhtenticationGuard: CanActivateFn = (route, state) => {
  const isloggin : Boolean = true;

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const refrechToken = localStorage.getItem('refrechToken');

  if((token == null || refrechToken == null) ){
    router.navigate(['/login']);
    return false;
  }
  return true;
}
