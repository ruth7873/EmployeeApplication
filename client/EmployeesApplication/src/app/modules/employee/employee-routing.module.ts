import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { ShowEmployeeComponent } from "./show-employee/show-employee.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { LoginService } from "../login/login.service";

const APP_ROUTES: Route[] = [
    {path: "", redirectTo: "employee/allEmployees", pathMatch: 'full'},
    { path: "allEmployees", component:AllEmployeesComponent
   //  ,canActivate:[LoginService]
 },
    { path: "detailes", component:ShowEmployeeComponent },
    { path: "add", component:AddEmployeeComponent
   //  ,canActivate:[LoginService]
 },
    { path: "edit", component:AddEmployeeComponent
   //  ,canActivate:[LoginService]
 },
]
@NgModule({
    imports:[RouterModule.forChild(APP_ROUTES)],
    exports:[RouterModule]
})
export class EmployeeRoutingModule{}