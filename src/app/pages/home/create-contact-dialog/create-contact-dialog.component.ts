import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactProvider } from 'src/providers/contact.provider';
import { ErrorService } from 'src/services/error-service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm!: FormGroup;
  method!: string | null;

  constructor(
    public dialogRef: MatDialogRef<CreateContactDialogComponent>,
    private contactProvider: ContactProvider,
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      id: this.data ? this.data.id : null,
      nome: [null, Validators.required],
      telefone: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
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
      } catch (error: any) {
        console.log('ERROR 132' + error);
        this.snackBarService.showError(error)
        return this.errorService.handleError(error);
      }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}

