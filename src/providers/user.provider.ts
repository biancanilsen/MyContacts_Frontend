import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient } from 'src/apiClient';
import { User } from 'src/models/userModel';
import { ApiResponse } from 'src/utils/api-response';

const apiVersion = 'api/v1';

@Injectable({
  providedIn: 'root',
})
export class UsersProvider {
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void { }

  async saveNewUser(user: User): Promise<ApiResponse> {
    return await this.apiClient.post('user/register', user);
  }
}
