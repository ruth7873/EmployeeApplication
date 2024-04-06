
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee.model';
import { EmployeeRole } from '../employee-role.model';

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
    @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<AddEmployeeComponent>) {
    this.employee = data.emp;
    
    data.roles.forEach(element => {
      this.availableRoles.push(new EmployeeRole(element))
      this.chooseDate.push(false);
    });

    this.allRoles = this.availableRoles;
    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employee?.firstName, [Validators.required]),
      lastName: new FormControl(this.employee?.lastName, [Validators.required]),
      identificationNumber: new FormControl(this.employee?.identificationNumber, [Validators.required, this.israeliIdNumberValidator]),
      gender: new FormControl(this.employee?.gender, []),
      dateOfBirth: new FormControl(this.isValidDate(this.employee?.dateOfBirth) ? new Date(this.employee?.dateOfBirth).toISOString().substring(0, 10) : '', [Validators.required, Validators.min(3)]),
      employmentStartDate: new FormControl(this.isValidDate(this.employee?.employmentStartDate) ? new Date(this.employee?.employmentStartDate).toISOString().substring(0, 10) : '', [Validators.required]),
      status: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.myRoles = this.employee.roles;
    this.myRoles.forEach(r => this.availableRoles = this.availableRoles.filter(rr => rr.role.id != r.role.id));
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
  validateStartDate() {
    console.log(this.employee.employmentStartDate < this.entryDate);
    return !(this.employee.employmentStartDate < this.entryDate);
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


  addEmployee() {
    this.employeeForm.value.id = this.employee.id || 1; 
    this.employee = this.employeeForm?.value;
    this.employee.roles = this.myRoles;
    this.myRoles.map(role => role.roleId = role.role.id);
    console.log("55555555550", this.employee);
    this.dialogRef.close(this.employee);
  }
}
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';
// import { ActivatedRoute, Router } from '@angular/router';
// import { EmployeeService } from '../employee.service';
// import { RoleService } from '../role.service';
// import { Employee } from '../employee.model';
// import { EmployeeRole } from '../employee-role.model';
// import { Role } from '../role.model';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-add-employee',
//   templateUrl: './add-employee.component.html',
//   styleUrls: ['./add-employee.component.scss']
// })
// export class AddEmployeeComponent implements OnInit {
  
//   isEdit: boolean = false;
//   allRoles: EmployeeRole[] = [];
//   availableRoles: EmployeeRole[] = [];
//   myRoles:EmployeeRole[]=[]
//   employeeForm: FormGroup;
//   employee: Employee = new Employee();
//   chooseDate:boolean[]=[];
//   entryDate:Date=new Date();

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private dialogRef: MatDialogRef<AddEmployeeComponent>) {
//     this.employee = data.emp;
    
//     data.roles.forEach(element => {
//       this.availableRoles.push(new EmployeeRole(element))
//       this.chooseDate.push(false);
//     });

//     this.allRoles=this.availableRoles
//     this.employeeForm = new FormGroup({
//       firstName: new FormControl(this.employee?.firstName, [Validators.required]),
//       lastName: new FormControl(this.employee?.lastName, [Validators.required]),
//       identificationNumber: new FormControl(this.employee?.identificationNumber, [Validators.required]),
//       gender:new FormControl(this.employee?.gender,[]),
//       dateOfBirth: new FormControl(this.isValidDate(this.employee?.dateOfBirth) ? new Date(this.employee?.dateOfBirth).toISOString().substring(0, 10) : '', [Validators.required, Validators.min(3)]),
//       employmentStartDate: new FormControl(this.isValidDate(this.employee?.employmentStartDate) ? new Date(this.employee?.employmentStartDate).toISOString().substring(0, 10) : '', [Validators.required]),
//       status:new FormControl(true),
//     });
//   }



//   ngOnInit(): void {
//     this.myRoles=this.employee.roles;
//     this.myRoles.forEach(r=>this.availableRoles=this.availableRoles.filter(rr=>rr.role.id!=r.role.id))
//   }
//   validateStartDate(){
//     console.log(this.employee.employmentStartDate<this.entryDate);
    
//     return !(this.employee.employmentStartDate<this.entryDate);

//   }
//   // getCssClass(emp:Employee) {
//   //   console.log(emp.employmentStartDate);
//   //   console.log(this.entryDate);
//   //   console.log(emp.employmentStartDate<this.entryDate);
    
    
//     // const dateString = emp.employmentStartDate;
//     // let aa=new Date(this.entryDate.getFullYear(),this.entryDate.getMonth(),this.entryDate.getDate())
//     // console.log(aa);
    
//     // const parts = dateString.split('-');
//     // console.log(parts);
    
//     // let dateObject
//     // if (parts)
//     //      dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
//     // const dateString2 = this.entryDate;
//     // let bb=new Date(this.entryDate.getFullYear(),this.entryDate.getMonth(),this.entryDate.getDay())
//     // console.log(bb);
    
    
//     // console.log(aa>bb);
    
//     // return dateObject > dateObject2 ? 'date' : null;
  
//      addThisRole(i:number){
//       this.chooseDate[i]=true;
//      }
//      saveThisRole(r:EmployeeRole,i:number){    
//       r.entryDate=this.entryDate;
//       this.entryDate=new Date();
//       this.myRoles.push(r);
      
//       this.availableRoles=this.availableRoles.filter(ro=>!this.myRoles.includes(ro))
//     // console.log(this.entryDate);
 
//       this.chooseDate[i]=false;       
//     }
//     removeThisRole(role:EmployeeRole){
// this.myRoles=this.myRoles.filter(r=>r.role.id!=role.role.id)
// this.availableRoles.push(role)
//     }
//   private isValidDate(value: any): boolean {
//     const date = new Date(value);
//     return !isNaN(date.getTime());
//   }


//   // addRole() {
//   //   this.rolesControls.push(new FormControl());
//   //   this.rolesControls2.push(new FormControl());

//   //   // Update availableRoles after adding a role
//   //   this.availableRoles = this.allRoles.filter(role =>
//   //     !this.rolesControls.map(e => +(e.value)).includes(role.id)
//   //   );
//   // }



//     // roleForm: FormGroup;


//     // addRole() {
//     //   if (this.roleForm.valid) {
//     //     const roleName = this.roleForm.get('roleName')?.value;
//     //     const startDate = this.roleForm.get('startDate')?.value;

//     //     // Add role logic here (e.g., pass data to service)
//     //     console.log('Role Name:', roleName);
//     //     console.log('Start Date:', startDate);

//     //     // Clear the form after adding the role
//     //     // this.roleForm.reset();
//     //   } else {
//     //     // Handle form validation errors or feedback to the user
//     //   }
//     // }


//   addEmployee() {
//     this.employeeForm.value.id = this.employee.id || 1; 
//     this.employee = this.employeeForm?.value;
//     this.employee.roles=this.myRoles;
//     this.myRoles.map(role=>role.roleId=role.role.id)

//     console.log("55555555550",this.employee);
    
//     this.dialogRef.close(this.employee)
//   }
// }

// // import { Component, OnInit } from '@angular/core';
// // import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// // import Swal from 'sweetalert2';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { EmployeeService } from '../employee.service';
// // import { RoleService } from '../role.service';
// // import { Employee } from '../employee.model';
// // import { EmployeeRole } from '../employee-role.model';
// // import { Role } from '../role.model';

// // @Component({
// //   selector: 'app-add-employee',
// //   templateUrl: './add-employee.component.html',
// //   styleUrls: ['./add-employee.component.scss']
// // })
// // export class AddEmployeeComponent implements OnInit {
// //   employeeForm: FormGroup;
// //   roles: any[] = [];

// //   constructor(private formBuilder: FormBuilder, private roleService: RoleService,private _employeeService: EmployeeService, private router: Router, private _acr: ActivatedRoute
// //   ) {
// //     this.employeeForm = this.formBuilder.group({
// //       // הגדרת כל השדות של העובד
// //       firstName: ['', Validators.required],
// //       lastName: ['', Validators.required],
// //       identificationNumber: ['', Validators.required],
// //       gender: ['', Validators.required],
// //       dateOfBirth: ['', Validators.required],
// //       employmentStartDate: ['', Validators.required],
// //       roles: this.formBuilder.array([])
// //     });
// //   }


// //   isEdit: boolean = false;
// //   allRoles: Role[] = [];
// //   availableRoles: Role[] = [];

// //   private _employee: Employee = new Employee();

// //   ngOnInit(): void {
// //     // קריאה לשירות התפקידים על מנת לקבל את רשימת התפקידים
// //     this.roleService.getRoles().subscribe((data: any[]) => {
// //       this.roles = data;
// //       // הוספת תפקיד ריק כברירת מחדל לטופס
// //       this.addRole();
// //     });
  

// //     this._acr.paramMap.subscribe(paramMap => {
// //       if (paramMap) {
// //         if (paramMap.has("id")) {
// //           let id = +(paramMap.get("id")!);
// //           this._employeeService.getEmployeeById(id).subscribe(e => {
// //             this.employee = e;
// //             e.roles.forEach(r => {
// //               this.addRoleCheckbox(r.role.id, r.entryDate);
// //             });
// //           });
// //         }
// //       }
// //     });
// //   }
// //   addRole(): void {
// //     const roles = this.employeeForm.get('roles') as FormArray;
// //     roles.push(this.formBuilder.group({
// //       roleId: ['', Validators.required],
// //       entryDate: ['', Validators.required]
// //     }));
// //   }


// //   public get employee(): Employee {
// //     return this._employee;
// //   }

// //   public set employee(value: Employee) {
// //     this._employee = value;
// //     this.employeeForm?.patchValue({
// //       firstName: this.employee.firstName,
// //       lastName: this.employee.lastName,
// //       identificationNumber: this.employee.identificationNumber,
// //       gender: this.employee.gender,
// //       dateOfBirth: this.isValidDate(this.employee.dateOfBirth) ? new Date(this.employee.dateOfBirth).toISOString().substring(0, 10) : '',
// //       employmentStartDate: this.isValidDate(this.employee.employmentStartDate) ? new Date(this.employee.employmentStartDate).toISOString().substring(0, 10) : '',
// //     });
// //   }


// //   private isValidDate(value: any): boolean {
// //     const date = new Date(value);
// //     return !isNaN(date.getTime());
// //   }


// //   removeRoleCheckbox(index: number) {
// //     const rolesFormArray = this.employeeForm.get('roles') as FormArray;
// //     rolesFormArray.removeAt(index);
// //   }

// //   // addRoleCheckbox(roleId: number = 0, entryDate: Date = new Date()) {
// //   //   const rolesFormArray = this.employeeForm.get('roles') as FormArray;
// //   //   rolesFormArray.push(new FormGroup({
// //   //     roleId: new FormControl(roleId),
// //   //     entryDate: new FormControl(entryDate)
// //   //   }));
// //   // }
// //   addRoleCheckbox(roleId: number = 0, entryDate: Date = new Date()) {
// //     const rolesFormArray = this.employeeForm.get('roles') as FormArray;
// //     rolesFormArray.push(new FormGroup({
// //       roleId: new FormControl(roleId),
// //       entryDate: new FormControl(entryDate),
// //       entryDateEnabled: new FormControl(false)
// //     }));
// //   }
// //   toggleDateField(control: FormControl, checked: boolean) {
// //     if (checked) {
// //       control.enable();
// //     } else {
// //       control.disable();
// //     }
// //   }


// //   getRoleName(roleId: number): string {
// //     const role = this.allRoles.find(r => r.id === roleId);
// //     return role ? role.roleName : 'Role Not Found';
// //   }

// //   addEmployee() {
// //     const employeeData = this.employeeForm.value;

// //     this._employeeService.addEmployee(employeeData).subscribe(d => {
// //       Swal.fire({
// //         title: "Success",
// //         text: "Employee added successfully",
// //         icon: "success",
// //         confirmButtonText: "OK",
// //       }).then(() => {
// //         this.router.navigate(["/employee/allEmployees"]);
// //       });
// //     }, error => {
// //       console.log(error);
// //       Swal.fire({
// //         title: "Error",
// //         text: error.message,
// //         icon: "error",
// //         confirmButtonText: "OK",
// //       });
// //     });
// //   }
// // }
