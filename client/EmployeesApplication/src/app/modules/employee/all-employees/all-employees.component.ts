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
@Component({
  selector: 'app-all-employees',
  // standalone: true,
  // imports: [],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent implements OnInit {
  selectedValue: any;
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
  newEmployee: Employee;
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
          this._employeeService.getAllEmployees().subscribe(d => this.employees = d)
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('User canceled the deletion');
      }
    });
  }
  editEmployee(emp: Employee) {
    // this._employeeService.updateEmployee(emp).subscribe(()=>this.printAlert("updated"))

    this.newEmployee = new Employee()
    console.log("22", emp);

    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '600px',
      data: emp
      //  {
      //    emp:emp,
      //    roles:this.allRoles
      //  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result", result);
        if (emp != null) {
          this._employeeService.updateEmployee(result).subscribe(() => this.printAlert("updated"))

        }
        else {

          this._employeeService.addEmployee(result).subscribe(d => this.printAlert("added"), error => {
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

  // editEmployee(emp: Employee) {
  //   this._router.navigate(['employee/edit', emp]);
  // }
  // showDetailes(emp: Employee) {
  //   this._router.navigate(['employee/detailes', emp])
  // }
  employees: Employee[];
  employees2: Employee[];
  allRoles: Role[] = [];
  constructor(private _employeeService: EmployeeService, private _roleService: RoleService, private _router: Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    this._employeeService.getAllEmployees().subscribe(d => { this.employees = d; this.employees2 = d })
    this._roleService.getRoles().subscribe(data => {
      this.allRoles = data;
      // this.availableRoles = this.allRoles;
    });
  }


}