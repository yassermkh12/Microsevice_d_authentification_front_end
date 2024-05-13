import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {

  const token = localStorage.getItem('token');
  const refrechToken = localStorage.getItem('refrechToken');

  console.log("token dans l intercepteur : ", token)
  console.log("refrechtoken dans l intercepteur : ", refrechToken)

  if(token !== null) {
    let clone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log("clone dans l intercepteur : ", clone)
    return next(clone).pipe(
      catchError(error => {
        if(error.status === 403 || error.status === 401){

          let refrechToken1 = refrechToken;

          console.log("refrechToken1 : ", refrechToken1);

          if(refrechToken1 !== null) {
            let cloneRefech = request.clone({
              setHeaders: {
                Authorization: `Bearer ${refrechToken1}`
              }
            })
            console.log("clone refrech dans l intercepteur", cloneRefech)
            return next(cloneRefech);
          }
        }

        return throwError('oui')
      })
    )
  }else{
    return next(request);
  }

  // console.log("request : ", request);


};
