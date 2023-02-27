import { Injectable } from '@angular/core';
import { ApiClient } from 'src/apiClient';
import { ApiContactResponse, ApiContactsResponse, ApideletedContact, ApiResponse } from 'src/utils/api-response';
import { ApiTokenResponse } from 'src/utils/api-response';

@Injectable({
  providedIn: 'root',
})
export class ContactProvider {
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void { }


  async listContactsByUserId(): Promise<ApiContactsResponse> {
    let result = await this.apiClient.get('contacts/list-contacts');
    return result
  }

  async saveNewContact(contact: any): Promise<ApiContactsResponse> {
    return await this.apiClient.post('contacts/register', contact);
  }

  async updateContact(contact: any): Promise<ApiContactResponse> {
    return await this.apiClient.put('contacts/update', contact);
  }

  async deleteContact(id: string): Promise<ApideletedContact> {
    const response = await this.apiClient.delete(`contacts`, { id: id });
    return response.data;
   
  }
}
