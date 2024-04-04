import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee.model";

@Injectable()
export class EmployeeService {
    constructor(private _http: HttpClient) { }
    private apiUrl = 'https://localhost:7020/api/Employee'; // Replace this with your API URL

    getEmployees(): Observable<Employee[]> {
        return this._http.get<Employee[]>(`${this.apiUrl}`);
    }

    getAllEmployees(): Observable<Employee[]> {
        return this._http.get<Employee[]>(`${this.apiUrl}`);
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this._http.get<Employee>(`${this.apiUrl}/${id}`);
    }

    addEmployee(newEmployee: Employee): Observable<Employee> {
        return this._http.post<Employee>(`${this.apiUrl}`, newEmployee);
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        console.log("aSDFGHJ");
        
        return this._http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
    }

    deleteEmployee(id: number): Observable<void> {
        return this._http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
