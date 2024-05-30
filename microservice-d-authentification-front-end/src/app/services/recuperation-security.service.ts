import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecuperationSecurityService {

  private API = "http://localhost:8080/api/recuperation-security/"

  constructor(private http: HttpClient) {
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation-security/forgotPassword/${email}`)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }

  verifyCode(email: string, code: string): Observable<void> {
    return this.http.get<void>(this.API + 'verify-code/' + email + '/' + code)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }

  resetPassword(email: string, password: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation-security/update-password-by-email/${email}/${password}`)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }
}
