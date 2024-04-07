import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = new User;
  userForm: FormGroup;
  hide: boolean = true;
  constructor(private _loginService: LoginService, private _router: Router) {

    this.userForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(3)]),
    })
  }
  login() {   
    this.user = this.userForm.value;
    this._loginService.login(this.user).subscribe(d => {
      if (typeof (window) !== undefined)
        sessionStorage.setItem("token", "Bearer " + d.token);
      if (d) {
        Swal.fire({
          title: `Welcome! ${this.user.userName}`,
          text: "You've logged in successfully!",
          icon: "success"
        });
        this._router.navigate(["employee/allEmployees"]);
      }
    }
      , error => {
        console.log(error);
          Swal.fire({
            titleText: "Register now!",
            text: "You are not registered in the system yet",
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            icon: "error",
          });
          this._router.navigate(["user/register"], { state: { user: this.user } });
        }
    )
  }
}






