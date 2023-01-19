import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';

const apiVersion = 'api/v1';

@Injectable({
  providedIn: 'root',
})
export class UsersProvider {
  constructor(private apiGateway: ApiGateway) {}

  ngOnInit(): void {}
  
  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.apiGateway.get('user').subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
        }, reject);
    });
}
}
