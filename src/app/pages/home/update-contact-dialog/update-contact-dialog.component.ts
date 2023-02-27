import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorItem } from 'src/utils/api-response';
import { ContactProvider } from '../../../../providers/contact.provider'
import { SnackBarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'update-contact-dialog',
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.scss']
})
export class UpdateContactDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm!: FormGroup;
  method!: string | null;
  errorItem: ErrorItem = {
    message: ""
  };
  errors: ErrorItem[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateContactDialogComponent>,
    private contactProvider: ContactProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
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
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
    if (this.data) {
      this.contactForm.patchValue(this.data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async save() {
    const data = this.contactForm.getRawValue();
    try {
      await this.contactProvider.updateContact(data);
      this.onChange.emit();
      this.snackbarService.successMessage("Contato alterado com sucesso")
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
