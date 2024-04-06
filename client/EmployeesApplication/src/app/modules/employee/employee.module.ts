import { NgModule } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { ShowEmployeeComponent } from "./show-employee/show-employee.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { RoleService } from "./role.service";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogActions } from "@angular/material/dialog";
import { LoginService } from "../login/login.service";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
    declarations: [AddEmployeeComponent, AllEmployeesComponent, ShowEmployeeComponent],
    imports: [EmployeeRoutingModule,MatDialogActions, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatGridListModule,MatMomentDateModule ],
    providers: [EmployeeService, RoleService,LoginService],
    exports: [AddEmployeeComponent]
})
export class EmployeeModule { }
