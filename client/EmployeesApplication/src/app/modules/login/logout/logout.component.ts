import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})

export class LogoutComponent implements OnInit {
  constructor(private router:Router){

  }
  ngOnInit(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token")
        this.router.navigate(['/user/login'])
        Swal.fire({
          title: "Goodbye!",
          text: "You successfully logged out!!!",
          icon: "success"
        });
      }
      else
      this.router.navigate(['employee/allEmployees'])
    });
  }
}
