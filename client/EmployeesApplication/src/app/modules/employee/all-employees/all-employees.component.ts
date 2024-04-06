import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import * as XLSX from 'xlsx';
import { MatRadioChange } from '@angular/material/radio';
import { ShowEmployeeComponent } from '../show-employee/show-employee.component';
import { RoleService } from '../role.service';
import { Role } from '../role.model';
import { AddRoleComponent } from '../../../add-role/add-role.component';
@Component({
  selector: 'app-all-employees',
  // standalone: true,
  // imports: [],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent implements OnInit {
  selectedValue: any;
  dataFetched: boolean; // Flag to track if data has been fetched
  newEmployee: Employee = new Employee();
  onSelectionChange(event: MatRadioChange) {
    this.selectedValue = event.value;
    console.log('Selected value:', this.selectedValue);
    this.filter()
  }
  filter() {
    console.log(this.selectedValue);
    console.log(this.employees2[0].gender == this.selectedValue);

    this.employees = this.employees2.filter(emp => (this.selectedValue == undefined || emp.gender == this.selectedValue) && (emp.firstName.includes(this.inputToFilter) || emp.lastName.includes(this.inputToFilter) || emp.identificationNumber.includes(this.inputToFilter)
      || emp.gender.toString().includes(this.inputToFilter))
    )
  }
  inputToFilter: string = '';
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employees);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  }
  openEmployeeModal(emp?: Employee): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
      data: emp  // Pass employee data to the modal for editing existing employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform actions based on the result of the modal (e.g., save changes)
      }
    });
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('User confirmed the deletion');
        this._employeeService.deleteEmployee(id).subscribe(() => {
          this._employeeService.getEmployees().subscribe(d => this.employees = d)
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('User canceled the deletion');
      }
    });
  }
  editEmployee(emp: Employee) {
    this.newEmployee = new Employee()
    console.log("22", this.allRoles);

    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '600px',
      data:
      {
        emp: emp,
        roles: this.allRoles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result", result);
        if (emp.firstName != null) {
          this._employeeService.updateEmployee(result).subscribe(() => this.printAlert("employee","updated"))
        }
        else {

          this._employeeService.addEmployee(result).subscribe(d => this.printAlert("employee","added"), error => {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: error.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
        }
        // Perform actions based on the result of the modal (e.g., save changes)
      }
    });
  }
  printAlert(str: string) {
    {
      Swal.fire({
        title: "Success",
        text: `Employee ${str} successfully`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        this._employeeService.getEmployees().subscribe(d => this.employees = d)
        // this.router.navigate(["/employee/allEmployees"]);
      });
    }
  }
  showDetailes(emp: Employee) {
    const dialogRef = this.dialog.open(ShowEmployeeComponent, {
      width: '500px',
      data: emp
    });
  }
  addRole(){
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result", result);
          this._roleService.addRole(result).subscribe(() => this.printAlert("role","added"))
        // Perform actions based on the result of the modal (e.g., save changes)
      }
    });
  }

  employees: Employee[];
  employees2: Employee[];
  allRoles: Role[] = [];
  token: string;
  constructor(private _employeeService: EmployeeService, private _roleService: RoleService, private _router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.dataFetched) { // Fetch data only if not already fetched
      console.log("aaaaaaaaaaaaaaaaaa");
      
      this._employeeService.getEmployees().subscribe(
        d => {
          this.employees = d;
          this.employees2 = d;
          this.dataFetched = true; // Set flag to true after fetching data
        },
        error => {
          if (error.status === 401) {
            Swal.fire({
              title: `Unauthorized error!!!`,
              text: "You are not authorized to access this resource",
              icon: "error",
              timer: 3000
            });
            this._router.navigate(["/user/login"])
            // ניתן להוסיף כאן ניווט לעמוד ההתחברות או להציג הודעת שגיאה מתאימה למשתמש
          } else {
            console.error("An unexpected error occurred:");
            // טיפול בשגיאה אחרת (לא מזוהה)
          }
        }
      );
    }
    this._roleService.getRoles().subscribe(data => {
      this.allRoles = data;
    });
  }
}