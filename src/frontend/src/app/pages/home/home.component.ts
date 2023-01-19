import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @ViewChild('contactTable') contactTable!: MatTable<any>;
    dataContact: [] = [];

    displayedColumns: string[] = ['nome', 'telefone', 'email', 'icon'];

    constructor(
        private contactProvider: ContactProvider,
    ) { }

    ngOnInit(): void {
        this.getContactList();
    }

    async getContactList() {
        this.dataContact = await this.contactProvider.listContactsByUserId();
        console.log("🚀 ~ file: home.component.ts:29 ~ HomeComponent ~ getContactList ~ this.dataContact", this.dataContact)
    }

    onClick() {
        window.open("URL");
    }
}

