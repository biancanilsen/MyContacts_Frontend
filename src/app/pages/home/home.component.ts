import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContactProvider } from '../../../providers/contact.provider';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateContactDialogComponent } from './update-contact-dialog/update-contact-dialog.component';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { UserService } from '../../../services/user.service';
import { environment } from 'src/environments/environment';
import { SnackBarService } from 'src/services/snackbar.service';
import { ApiContactResponse } from 'src/utils/api-response';
import { Contact } from '../../../models/contactModel'
import { MyChangeEvent } from 'src/models/eventModel';
import { ContactTableModel } from 'src/models/contactTableModel';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    @Output() onChange: EventEmitter<MyChangeEvent> = new EventEmitter();
    @ViewChild('contactTable') contactTable!: MatTable<ContactTableModel>;
    dataContact: Contact[] = [];
    displayedColumns: string[] = ['nome', 'telefone', 'email', 'icon'];
    hasToken: boolean = false;

    constructor(
        public dialog: MatDialog,
        private contactProvider: ContactProvider,
        private dialogService: ConfirmDialogService,
        private userService: UserService,
        private snackbarService: SnackBarService
    ) { }

    ngOnInit(): void {
        this.hasToken = localStorage.getItem('token') != null;
        if (!this.hasToken) {
            location.replace(environment.loginRoute);
        }
        this.getContactList();
    }

    async getContactList() {
        let response = await this.contactProvider.listContactsByUserId();
        this.dataContact = response.apiResponse;
    }

    getContacts(contactSelected: any) {
        const dialogRef = this.dialog.open(UpdateContactDialogComponent, {
            width: '500px',
            height: '400px',
            data: contactSelected,
        });

        dialogRef.componentInstance.onChange.subscribe(() => {
            this.getContactList();
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

        dialogRef.componentInstance.onChange.subscribe(() => {
            this.getContactList();
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
                    this.snackbarService.showAlert("Contato excluído com sucesso");
                } catch (error) {
                    this.snackbarService.showAlert("Ocorreu um erro ao excluir esse contato");
                }
            }
        });
    }

    logout() {
        this.userService.logout();
    }
}