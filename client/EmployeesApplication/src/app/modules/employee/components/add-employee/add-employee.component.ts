// import { Component, Inject, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Employee } from '../../models/employee.model';
// import { EmployeeRole } from '../../models/employee-role.model';

// @Component({
//   selector: 'app-add-employee',
//   templateUrl: './add-employee.component.html',
//   styleUrls: ['./add-employee.component.scss']
// })
// export class AddEmployeeComponent implements OnInit {

//   employeeForm: FormGroup;
//   employee: Employee = new Employee();
//   availableRoles: EmployeeRole[] = [];
//   roles: FormArray;
//   selectedRoles: Set<number> = new Set<number>();

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private dialogRef: MatDialogRef<AddEmployeeComponent>,
//     private formBuilder: FormBuilder
//   ) {
//     this.employee = data.emp;
//     data.roles.forEach(element => {
//       this.availableRoles.push(new EmployeeRole(element))
//     });

//     this.employeeForm = this.formBuilder.group({
//       firstName: [this.employee?.firstName, Validators.required],
//       lastName: [this.employee?.lastName, Validators.required],
//       identificationNumber: [this.employee?.identificationNumber, Validators.required],
//       gender: [this.employee?.gender],
//       dateOfBirth: [this.isValidDate(this.employee?.dateOfBirth) ? new Date(this.employee?.dateOfBirth).toISOString().substring(0, 10) : '', [Validators.required, Validators.min(3)]],
//       employmentStartDate: [this.isValidDate(this.employee?.employmentStartDate) ? new Date(this.employee?.employmentStartDate).toISOString().substring(0, 10) : '', Validators.required],
//       status: [true],
//       roles: this.formBuilder.array([])
//     });

//     this.roles = this.employeeForm.get('roles') as FormArray;
//     if (this.employee.roles && this.employee.roles.length > 0) {
//       this.employee.roles.forEach(role => {
//         this.addRole(role.role.id, role.entryDate);
//       });
//     } else {
//       this.addRole();
//     }
//   }

//   ngOnInit(): void { }

//   private isValidDate(value: any): boolean {
//     const date = new Date(value);
//     return !isNaN(date.getTime());
//   }
//   addRole(roleId: number = 0, entryDate: Date = new Date()): void {
//     this.selectedRoles.add(roleId);

//     // if (entryDate instanceof Date) {
//       this.roles.push(this.formBuilder.group({
//         roleId: [roleId, Validators.required],
//         entryDate: [entryDate, Validators.required]
//       }));
//     // } else {
//     //   console.error('entryDate is not a valid Date object');
//     // }
//   }
//   removeRole(index: number): void {
//     this.roles.removeAt(index);
//   }
//   addEmployee(): void {
//     if (this.employeeForm.valid) {
//       const employeeData = this.employeeForm.value;
//       this.dialogRef.close(employeeData);
//     }
//   }

// }



import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeRole } from '../../models/employee-role.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  isEdit: boolean = false;
  allRoles: EmployeeRole[] = [];
  availableRoles: EmployeeRole[] = [];
  myRoles: EmployeeRole[] = [];
  employeeForm: FormGroup;
  employee: Employee = new Employee();
  chooseDate: boolean[] = [];
  entryDate: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<AddEmployeeComponent>, private _formBuilder: FormBuilder) {
    this.employee = data.emp;
    console.log(this.employee);

    data.roles.forEach(element => {
      this.availableRoles.push(new EmployeeRole(element))
      this.chooseDate.push(false);
    });

    this.allRoles = this.availableRoles;
    this.createEmployeeForm();
  }

  ngOnInit(): void {
    this.myRoles = this.employee.roles;
    this.myRoles.forEach(r => this.availableRoles = this.availableRoles.filter(rr => rr.role.id != r.role.id));
  }

  private createEmployeeForm(): void {
    this.employeeForm = this._formBuilder.group({
      firstName: new FormControl(this.employee?.firstName, [Validators.required]),
      lastName: new FormControl(this.employee?.lastName, [Validators.required]),
      identificationNumber: new FormControl(this.employee?.identificationNumber, [Validators.required, this.israeliIdNumberValidator]),
      gender: new FormControl(this.employee?.gender, []),
      dateOfBirth: new FormControl(this.isValidDate(this.employee?.dateOfBirth) ? new Date(this.employee?.dateOfBirth).toISOString().substring(0, 10) : '', [Validators.required, this.validateAge.bind(this)]),
      employmentStartDate: new FormControl(this.isValidDate(this.employee?.employmentStartDate) ? new Date(this.employee?.employmentStartDate).toISOString().substring(0, 10) : '', [Validators.required, this.validateStartDate.bind(this)]),
      status: new FormControl(true),
      roles: this._formBuilder.array(this.employee?.roles)
    });
  }

  private israeliIdNumberValidator(control: FormControl): { [key: string]: boolean } | null {
    const id = control.value;
    if (!id || id.length !== 9 || isNaN(id)) {
      return { 'invalidId': true };
    }
    const weightedDigitsSum = Array.from(id, Number)
      .map((digit, i) => digit * ((i % 2) + 1))
      .reduce((sum, digit) => sum + (digit > 9 ? digit - 9 : digit), 0);
    if (weightedDigitsSum % 10 !== 0) {
      return { 'invalidId': true };
    }
    return null; // המספר תקין
  }
  validateStartDate(): { [key: string]: boolean } | null {
    if (this.employeeForm && this.employeeForm.get('employmentStartDate').value < this.employeeForm.get('dateOfBirth').value)
      return { 'invalidStartDate': true };
    return null;
  }
  // validateStartDate(): { [key: string]: boolean } | null {
  //   const employmentStartDate = this.employeeForm?.get('employmentStartDate').value;
  //   const dateOfBirth = this.employeeForm?.get('dateOfBirth').value;

  //   if (employmentStartDate && dateOfBirth && employmentStartDate <= dateOfBirth) {
  //     return { 'invalidStartDate': true };
  //   }

  //   return null;
  // }

  validateAge(control: FormControl): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return { 'invalidAge': true };
    }
    return null;
  }

  private isValidDate(value: any): boolean {

    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  addThisRole(i: number) {
    this.chooseDate[i] = true;
  }

  saveThisRole(r: EmployeeRole, i: number) {
    r.entryDate = this.entryDate;
    this.entryDate = new Date();
    this.myRoles.push(r);
    this.availableRoles = this.availableRoles.filter(ro => !this.myRoles.includes(ro));
    this.chooseDate[i] = false;
  }

  removeThisRole(role: EmployeeRole) {
    this.myRoles = this.myRoles.filter(r => r.role.id != role.role.id);
    this.availableRoles.push(role);
  }

  selectedRoles: boolean[] = new Array(this.availableRoles.length).fill(false);

  // addEmployee() {
  //   this.employeeForm.value.id = this.employee.id || 1;
  //   this.employee = this.employeeForm?.value;
  //   this.employee.roles = this.myRoles;
  //   this.myRoles.map(role => role.roleId = role.role.id);
  //   this._dialogRef.close(this.employee);
  // }
  addEmployee() {
    this.employeeForm.value.id = this.employee.id || 1;
    this.employee = this.employeeForm?.value;
    this.employee.roles = this.myRoles;
    this.myRoles.map(role => role.roleId = role.role.id);
    this._dialogRef.close(this.employee);
  }
  closeDialog(): void {
    this._dialogRef.close();
  }
}