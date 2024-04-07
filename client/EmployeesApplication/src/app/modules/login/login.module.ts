import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { LoginRoutingModule } from "./login-routing.module";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations: [LoginComponent,RegisterComponent],
    imports:[FormsModule,ReactiveFormsModule,LoginRoutingModule,HttpClientModule,CommonModule,MatFormFieldModule,MatIconModule,MatInputModule],
    providers: [LoginService],
    exports: [LoginComponent]
})
export class LoginModule { }
