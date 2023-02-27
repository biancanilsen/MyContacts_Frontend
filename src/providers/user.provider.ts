import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient } from 'src/apiClient';
import { ApiResponse } from 'src/utils/api-response';

const apiVersion = 'api/v1';

@Injectable({
  providedIn: 'root',
})
export class UsersProvider {
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void { }

  saveNewUser(contact: any): Promise<ApiResponse<null>> {
    return new Promise((resolve, reject) => {
      this.apiClient
        .post('user/register', contact)
        .then((response) => {
        ;
        })
        .catch((error) => {
          reject(error);
        });

    });
  }
}
