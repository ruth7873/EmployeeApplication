import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee.model";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class EmployeeService {
    constructor(private _http: HttpClient,private _router:Router) {
    }
    private apiUrl = 'https://localhost:7020/api/Employee'; // Replace this with your API URL
    token: any;
    headers: any;
    init() {
        if (typeof sessionStorage !== 'undefined'&&sessionStorage?.getItem("token")) {
            this.token = sessionStorage?.getItem("token")
            this.headers = new HttpHeaders({
                'Authorization': this.token
            });
        } else {
            Swal.fire({
                title: `Unauthorized error!!!`,
                text: "You are not authorized to access this resource",
                icon: "error",
                timer: 3000
              });
              this._router.navigate(["/user/login"])
            // Handle the case when sessionStorage is not available
        }

  
        
    }
  
    getEmployees(): Observable<Employee[]> {
        this.init()        
        return this._http.get<Employee[]>(`${this.apiUrl}`, { "headers": this.headers });
    }


    getEmployeeById(id: number): Observable<Employee> {
        this.init()
        return this._http.get<Employee>(`${this.apiUrl}/${id}`);
    }

    addEmployee(newEmployee: Employee): Observable<Employee> {
        this.init()
        return this._http.post<Employee>(`${this.apiUrl}`, newEmployee, { "headers": this.headers });
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        this.init()
        return this._http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee, { "headers": this.headers });
    }

    deleteEmployee(id: number): Observable<void> {
        this.init()
        return this._http.delete<void>(`${this.apiUrl}/${id}`, { "headers": this.headers });
    }
}
