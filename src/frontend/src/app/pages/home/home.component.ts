import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactProvider } from 'src/providers/contact.provider';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
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
    method!: string;
    displayedColumns: string[] = ['nome', 'telefone', 'email', 'icon'];
    contact: any;

    constructor(
        public dialog: MatDialog,
        private contactProvider: ContactProvider,
    ) { }

    ngOnInit(): void {
        this.getContactList();
    }

    async getContactList() {
        this.dataContact = await this.contactProvider.listContactsByUserId();
    }

    getContacts(contactSelected: any) {
        this.method = 'edit';
        sessionStorage.setItem('method', this.method);
        const dialogRef = this.dialog.open(HomeDialogComponent, {
            width: '500px',
            height: '400px',
            data: contactSelected,
        });
        dialogRef.afterClosed().subscribe(contact => {
            if (contact) {
                this.getContactList();
            }
        });
    }

    openDialog() {
        this.method = 'add';
        sessionStorage.setItem('method', this.method);
        const dialogRef = this.dialog.open(HomeDialogComponent, {
          width: '500px',
          height: '400px',
        });
    
        dialogRef.afterClosed().subscribe(dependent => {
          if (dependent) {
            this.getContactList();
          }
        });
      }
}

