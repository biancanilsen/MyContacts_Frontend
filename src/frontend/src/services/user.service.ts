// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private loggedChanged = new Subject<boolean>();
//   public isLogged = false;
//   constructor() { }

//   // auth(token: any): void {
//   //   this.isLogged = true;
//   //   this.loggedChanged.next(true);
//   //   localStorage.setItem('token', token);
//   // }

//   logout(): void {
//     localStorage.clear();
//     this.loggedChanged.next(false);
//     this.isLogged = false;
//     location.replace(environment.login);
//   }

//   isUserLoggedIn(): Subject<boolean> {
//     return this.loggedChanged;
//   }
// }
