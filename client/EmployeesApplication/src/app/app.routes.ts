import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

    export const routes: Routes = [
        {path: "", redirectTo: "employee", pathMatch: 'full'},
        {path: "employee", loadChildren: () => import("./modules/employee/employee.module").then(m => m.EmployeeModule) },
        {path: "home", component: HomeComponent},
    ]

  