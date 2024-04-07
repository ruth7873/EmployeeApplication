import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable()
export class LoginService {
  private apiUrl = 'https://localhost:7020/api';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth`, user);
  }
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users`, user);
  }
}