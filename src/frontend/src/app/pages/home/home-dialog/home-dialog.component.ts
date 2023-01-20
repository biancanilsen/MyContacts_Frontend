import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactProvider } from 'src/providers/contact.provider';

@Component({
  selector: 'home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.scss']
})
export class HomeDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm!: FormGroup;
  method!: string | null;

  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    private contactProvider: ContactProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      id: this.data ? this.data.id : null,
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
    if (this.method === 'add') {
      try {
        const contact = await this.contactProvider.saveNewContact(data);
        sessionStorage.setItem('contact_id', contact.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        await this.contactProvider.updateContact(data);
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
