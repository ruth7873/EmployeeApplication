import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './modules/employee/employee.module';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { LoginService } from './modules/login/login.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, EmployeeModule, RouterModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'EmployeesApplication';
  isUserLoggedIn: boolean = false;

  constructor(private _router: Router, private _loginService: LoginService, private _appService: AppService) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {

      this._router.events.subscribe(() => {
        this.isUserLoggedIn = !!sessionStorage.getItem("token");
      });
    }
  }
  async register() {
    Promise<void>
    const { value: password } =
      await Swal.fire({
        title: "Enter an administrator password",
        input: "password",
        inputPlaceholder: "Enter password",
        inputAttributes: {
          maxlength: "10",
          autocapitalize: "off",
          autocorrect: "off"
        },
        showCancelButton: true,
        customClass: {
          input: 'my-input-class'
        }
      });

    if (password) {
      this._loginService.passwordToRegister(password).subscribe(d => {
        this._appService.printAlert("Great", "you are authorized!", "success", 2000, false, false, "", "");
        this._router.navigate(["/user/register"])
      }, error => {
        this._appService.printAlert("wrong password!", "Are you authorized?", "question", 2500, false, false, "", "")
        this._router.navigate(["/user/login"])
      })
    }
  }


}
