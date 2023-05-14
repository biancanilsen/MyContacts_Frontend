import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactData } from 'src/models/contactDialogModel';
import { MyChangeEvent } from 'src/models/eventModel';
import { ContactProvider } from 'src/providers/contact.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { ErrorItem } from 'src/utils/api-response';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent {
  @Output() onChange: EventEmitter<MyChangeEvent> = new EventEmitter();
  public myModel = ''
  public mask = ['+', /\d/, /\d/, '(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
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
    @Inject(MAT_DIALOG_DATA) public data: ContactData,
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
          Validators.maxLength(16),
          Validators.minLength(16),
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
      const response = await this.contactProvider.saveNewContact(data);
      if (response.errors && response.errors.length > 0) {
        this.errors = response.errors;
      } else {
        this.onChange.emit();
        this.snackbarService.successMessage("Contato criado com sucesso");
        this.dialogRef.close();
      }
    } catch {
      this.errors = [{ message: "Ocorreu um erro ao criar seu contato. Tente novamente." }];
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}