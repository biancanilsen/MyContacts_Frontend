import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactProvider } from 'src/providers/contact.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { ErrorItem } from 'src/utils/api-response';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm!: FormGroup;
  errorItem: ErrorItem = {
    message: ""
  };
  errors: ErrorItem[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateContactDialogComponent>,
    private contactProvider: ContactProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
  ) {
    this.errors.push(this.errorItem);
    }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      id: this.data ? this.data.id : null,
      nome: [null, Validators.required],
      telefone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],

      email: [null, Validators.required, Validators.email],
    });
    if (this.data) {
      this.contactForm.patchValue(this.data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.contactForm.getRawValue();
    try {
      await this.contactProvider.saveNewContact(data);
      this.onChange.emit();
      this.snackbarService.successMessage("Contato criado com sucesso");
      this.dialogRef.close();
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        this.errors = error.response.data.errors;
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }

}


