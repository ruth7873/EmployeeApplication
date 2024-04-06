import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { LogoutComponent } from "./logout/logout.component";


const APP_ROUTES: Route[] = [
    { path: "login", component:LoginComponent },
    { path: "logout", component:LogoutComponent },


   
]
@NgModule({
    imports:[RouterModule.forChild(APP_ROUTES)],
    exports:[RouterModule]
})
export class LoginRoutingModule{}