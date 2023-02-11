import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersProvider } from 'src/providers/user.provider';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private userProvider: UsersProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    
    this.userForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.userForm.getRawValue();
      try {
        await this.userProvider.saveNewUser(data);
      } catch (error: any) {
        console.log('ERROR 132' + error);
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}