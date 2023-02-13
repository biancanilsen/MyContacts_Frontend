import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactProvider } from 'src/providers/contact.provider';

@Component({
  selector: 'update-contact-dialog',
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.scss']
})
export class UpdateContactDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm!: FormGroup;
  method!: string | null;

  constructor(
    public dialogRef: MatDialogRef<UpdateContactDialogComponent>,
    private contactProvider: ContactProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
    } catch (error: any) {
      console.log(error);
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
