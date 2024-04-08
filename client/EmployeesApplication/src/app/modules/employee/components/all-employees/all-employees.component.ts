import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import * as XLSX from 'xlsx';
import { MatRadioChange } from '@angular/material/radio';
import { ShowEmployeeComponent } from '../show-employee/show-employee.component';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import { AddRoleComponent } from '../add-role/add-role.component';
import { AppService } from '../../../../app.service';
import { error } from 'console';
@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent implements OnInit {
  newEmployee: Employee = new Employee();
  employees: Employee[];
  employees2: Employee[];
  allRoles: Role[] = [];
  selectedValue: any;
  inputToFilter: string = '';
  onSelectionChange(event: MatRadioChange) {
    this.selectedValue = event.value;
    this.filter()
  }
  filter() {
    const searchTerm = this.inputToFilter.toLowerCase();
    this.employees = this.employees2.filter(emp =>
      (this.selectedValue == undefined || emp.gender == this.selectedValue) &&
      (emp.firstName.includes(this.inputToFilter) ||
        emp.lastName.includes(this.inputToFilter) ||
        emp.identificationNumber.includes(this.inputToFilter) ||
        emp.gender.toString().includes(this.inputToFilter) ||
        emp.roles.some(r => r.role.roleName.toLowerCase().includes(searchTerm)))
    );

  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employees);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  }

  deleteEmployee(id: number) {
    this._appService.printAlert('Are you sure?', 'You are about to delete this employee!', 'warning', null, true, true, "Yes, delete it!", "No, keep it").then((result) => {
      if (result.isConfirmed) {
        this._employeeService.deleteEmployee(id).subscribe(() => {
          this._employeeService.getEmployees().subscribe(d => this.employees = d)
        });
      }
    });
  }

  editEmployee(emp: Employee) {
    this.newEmployee = new Employee()
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '800px',
      data:
      {
        emp: emp,
        roles: this.allRoles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (emp.firstName != null) {

          this._employeeService.updateEmployee(result).subscribe(() => this.printAlert("Employee", "updated"), error => {
            let message = this.errorMessage(error)
            this._appService.printAlert("Error", message.slice(0, message.indexOf(".")), "error", 3000, false, false, "", "")
          })
        }
        else {
          this._employeeService.addEmployee(result).subscribe(d => this.printAlert("Employee", "added")
            , error => {
              let message = this.errorMessage(error)
              this._appService.printAlert("Error", message.slice(0, message.indexOf(".")), "error", 3000, false, false, "", "")
              this._appService.printAlert("Error", error.message, "error", 2000, false, false, "", "")

            })
        }
      }
    })

  }
  errorMessage(error: any): string {
    // מחרוזת המכילה את ההודעה המלאה של השגיאה
    const errorMessage = error.error;
    // מציאת המיקום של התו ":" במחרוזת
    const colonIndex = errorMessage.indexOf(":");
    // חיתוך המחרוזת מאחרי התו ":"
    const errorMessageShort = errorMessage.substring(colonIndex + 1);
    return errorMessageShort;
  }
  printAlert(str: string, str2: string) {
    {
      this._appService.printAlert("Success", `${str} ${str2} successfully`, "success", 2000, false, false, "", "").then(() => {
        if (str == "Employee")
          this._employeeService.getEmployees().subscribe(d => this.employees = d)
        else
          this._roleService.getRoles().subscribe(d => this.allRoles = d)
      });
    }
  }
  showDetailes(emp: Employee) {
    const dialogRef = this.dialog.open(ShowEmployeeComponent, {
      width: '500px',
      data: emp
    });
  }
  addRole() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._roleService.addRole(result).subscribe(() => this.printAlert("Role", "added"), error => {
          // console.log(error.error);
          ; this._appService.printAlert("Error!", error.error, "error", 2000, false, false, "", "")
        })
      }
    });
  }
  constructor(private _employeeService: EmployeeService, private _roleService: RoleService, private _appService: AppService, private _router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._employeeService.getEmployees().subscribe(
      d => {
        this.employees = d;
        this.employees2 = d;
      },
      error => {
        if (error.status === 401) {
          this._appService.printAlert(`Unauthorized error!!!`, "You are not authorized to access this resource", "error", 2000, false, false, "", "");
          this._router.navigate(["/user/login"])
        }
      }
    );
    if (this.allRoles.length === 0) {
      this._roleService.getRoles().subscribe(
        data => {
          this.allRoles = data;
        },
        error => {
        }
      );
    }
    
    // this._appService.setEmployees(this.employees)
    // this.employees = this._appService.getAllEmployees();
  }

}