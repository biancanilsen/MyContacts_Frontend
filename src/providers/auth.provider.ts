import { Injectable } from '@angular/core';
import { ApiClient } from 'src/apiClient';
import { ApiTokenResponse } from 'src/utils/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthProvider {
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void { }

  async login(credentials: any): Promise<ApiTokenResponse> {
    return await this.apiClient.post('user/login', credentials);
  }
}
