import { Employee } from "./employee.model";
import { Role } from "./role.model";

export class EmployeeRole {
    employeeId: number;
    employee: Employee;
    roleId: number;
    role: Role;
    entryDate: Date;

    // constructor(role:Role,date:Date){
    //   this.role=role;
    //   this.entryDate=date;
    // }
  }
