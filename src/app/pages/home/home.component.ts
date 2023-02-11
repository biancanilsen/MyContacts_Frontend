import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContactProvider } from '../../../providers/contact.provider';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateContactDialogComponent } from './update-contact-dialog/update-contact-dialog.component';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { UserService } from '../../../services/user.service';
import { environment } from 'src/environments/environment';
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
    contact: any;
    token!: string;

    constructor(
        public dialog: MatDialog,
        private contactProvider: ContactProvider,
        private dialogService: ConfirmDialogService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.token = localStorage.getItem('token')!;
        if (!this.token) {
            location.replace(environment.loginRoute);
        }
        this.getContactList();
    }

    async getContactList() {
        this.dataContact = await this.contactProvider.listContactsByUserId();
    }

    getContacts(contactSelected: any) {
        const dialogRef = this.dialog.open(UpdateContactDialogComponent, {
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
        const dialogRef = this.dialog.open(CreateContactDialogComponent, {
            width: '500px',
            height: '400px',
        });

        dialogRef.afterClosed().subscribe(dependent => {
            if (dependent) {
                this.getContactList();
            }
        });
    }

    deleteContact(id: string) {
        const options = {
            data: {
                title: 'Atenção',
                subtitle: 'Você tem certeza que deseja excluir esse contato?',
            },
            panelClass: 'confirm-modal',
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(async confirmed => {
            if (confirmed) {
                try {
                    await this.contactProvider.deleteContact(id);
                    this.getContactList();
                } catch (error) {
                    console.log('ERROR 132' + error);
                }
            }
        });
    }

    logout() {
        this.userService.logout();
    }
}