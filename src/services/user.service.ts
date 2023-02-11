import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedChanged = new Subject<boolean>();
  public isLogged = false;
  constructor() {}

  logout(): void {
    localStorage.clear();
    location.replace(environment.loginRoute);
  }
}
