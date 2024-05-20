import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegisterRequest} from "../models/register-request";
import {catchError, Observable, throwError} from "rxjs";
import {AuthenticationResponse} from "../models/authentication-response";

@Injectable({
  providedIn: 'root'
})
export class RecuperationService {

  private API = "http://localhost:8080/api/recuperation/"

  constructor(private http : HttpClient) {
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation/forgotPassword/${email}`)
      .pipe(
        catchError(
          (error:HttpErrorResponse) =>{

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }

  verifyCode(email: string, code: string): Observable<void> {
    return this.http.get<void>(this.API + 'verify-code/'+ email +'/'+ code)
      .pipe(
        catchError(
          (error:HttpErrorResponse) =>{

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }
}
