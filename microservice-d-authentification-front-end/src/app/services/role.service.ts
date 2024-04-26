import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private API = "http://localhost:8080/api/Role/"

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>( this.API +'roles/');
  }

  save(role: Role): Observable<Role> {
    return this.http.post<Role>(this.API + 'save-role/', role);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(this.API + 'by-id/' + id);
  }

  delete(id: number) {
      return  this.http.delete<void>(this.API + 'delete-role/' + id);
    }
}
