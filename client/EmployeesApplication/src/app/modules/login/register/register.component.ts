import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  // imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _loginService: LoginService, private router: Router, private _acr: ActivatedRoute) {
    this.user = new User();
  }
  ngOnInit(): void { this.userExist = false }

  hide: boolean = true;
  registerForm: FormGroup;
  private _user: User = new User();
  userExist: boolean;
  public get user(): User {
    return this._user;
  }
  userName: string = ""
  public set user(value: User) {
    this._user = value;
    console.log(this._user);
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state && state['user']) {
      this._user = state['user']
    }
    if (this.user != undefined) {
      this.registerForm = new FormGroup({
        userName: new FormControl(this.user.userName, [Validators.required, Validators.minLength(3)]),
        address: new FormControl(this.user.address, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        password: new FormControl(this.user.password, [Validators.required, Validators.minLength(3)]),
      })
    }
  }
  registerUser() {
    this.user = this.registerForm.value;
    this._loginService.register(this.user).subscribe({
      next: (res => {
        if (res == undefined) {
          Swal.fire({
            title: `Oops`,
            text: "Username in use, please enter another name!",
            icon: "error"
          });
        }
        else {
          Swal.fire({
            title: `Hi ${this.user?.userName}`,
            text: "You have successfully registered!!!",
            icon: "success"
          });
          this._loginService.login(this.user).subscribe(() =>
            this.router.navigate(['employee/allEmployees'])
          )
        }
      })
    })
  }


}
