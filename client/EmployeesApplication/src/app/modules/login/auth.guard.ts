// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { LoginService } from './login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private loginService: LoginService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.loginService.isAuthenticated().pipe(
//       map(isAuthenticated => {
//         if (isAuthenticated) {
//           return true; // אם המשתמש מחובר, מאפשר המשך גישה לראוטים
//         } else {
//           this.router.navigate(['/login']); // אם המשתמש אינו מחובר, מפנה לדף ההתחברות
//           return false;
//         }
//       })
//     );
//   }
// }
