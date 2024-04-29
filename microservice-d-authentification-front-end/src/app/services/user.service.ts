import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user";
import * as http from "node:http";
import {environment} from "../../environements/environement";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = "http://localhost:8080/api/user/"

  constructor(private http : HttpClient) { }

  findAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>( this.API +'users');
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.API + 'save-user', user);
  }

  // // delete(user: User) {
  // //   return  this.http.delete<number>(this.API + 'id/' + user.id);
  // // }
  //
  // // edit(user: User): Observable<User> {
  // //   return this.http.put<User>(this.API, user);
  // // }

  findById(id: number): Observable<User> {
    return this.http.get<User>(this.API + 'by-id' + id);
  }


}
