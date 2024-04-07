import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../employee/employee.model";
import { User } from "./user.model";

@Injectable()
export class LoginService{

    private apiUrl = 'https://localhost:7020/api'; // Replace this with your API URL

  constructor(private http: HttpClient) { }

  login(user:User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth`, user);
  }
  register(user:User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users`, user);
  }
}