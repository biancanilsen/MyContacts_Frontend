import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';

@Injectable({
  providedIn: 'root',
})
export class AuthProvider {
  constructor(private apiGateway: ApiGateway) {}

  ngOnInit(): void {}

  login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post('user/login', credentials)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
