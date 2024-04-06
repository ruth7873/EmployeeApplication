import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './modules/login/auth.guard';

    export const routes: Routes = [
        {path: "", redirectTo: "employee", pathMatch: 'full'},
        {path: "employee", loadChildren: () => import("./modules/employee/employee.module").then(m => m.EmployeeModule)
        // ,canActivate: [AuthGuard] 
     },
        {path: "home", component: HomeComponent},
        {path:"user",loadChildren:()=>import("./modules/login/login.module").then(lm=>lm.LoginModule)}
    ]

  