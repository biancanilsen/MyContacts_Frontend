import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactProvider {
  constructor(private apiGateway: ApiGateway, private http: HttpClient) { }

  ngOnInit(): void { }

  listContactsByUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get('contacts/list-contacts')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body.apiResponse);
        }, reject);
    });
  }

  saveNewContact(contact: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.apiGateway
            .post('contacts/register', contact)
            .subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
    });
}

  updateContact(contact: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put('contacts/update', contact)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
