import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactProvider } from 'src/providers/contact.provider';

@Component({
  selector: 'edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm!: FormGroup;
  method!: string | null;

  constructor(
    public dialogRef: MatDialogRef<EditContactDialogComponent>,
    private contactProvider: ContactProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      id: this.data.id,
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
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
