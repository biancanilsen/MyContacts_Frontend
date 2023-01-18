import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactProvider } from 'src/providers/contact.provider';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  @ViewChild('contactTable') contactTable!: MatTable<any>;
  dataContact: [] = [];

  displayedContact: string[] = [
    'nome',
    'telefone',
    'email',
  ];

  selectedIndex: number = 0;
  Contact: any;
  form!: FormGroup;
  filteredContactList: any;

  constructor(
    private contactProvider: ContactProvider,
  ){}

    ngOnit(): void {
      console.log('a')
      this.getContactList();
      console.log('b')
    }

    async getContactList() {
      this.dataContact = await this.contactProvider.findAll();
      console.log("🚀 ~ file: home.component.ts:37 ~ HomeComponent ~ getContactList ~ this.dataContact", this.dataContact)
    }
}
