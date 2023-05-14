import { Injectable } from '@angular/core';
import { ApiClient } from 'src/apiClient';
import { Contact } from 'src/models/contactModel';
import { ApiContactResponse, ApiContactsResponse, ApiDeletedContact, ApiResponse } from 'src/utils/api-response';
import { ApiTokenResponse } from 'src/utils/api-response';

@Injectable({
  providedIn: 'root',
})
export class ContactProvider {
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void { }


  async listContactsByUserId(): Promise<ApiContactsResponse> {
    return await this.apiClient.get('/contacts/list-contacts');
  }

  async saveNewContact(contact: Contact): Promise<ApiContactsResponse> {
    return await this.apiClient.post('/contacts/register', contact);
  }

  async updateContact(contact: Contact): Promise<ApiContactResponse> {
    return await this.apiClient.put('/contacts/update', contact);
  }

  async deleteContact(id: string): Promise<ApiDeletedContact> {
    return await this.apiClient.delete('/contacts', { id: id });
  }
}
