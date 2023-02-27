import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersProvider } from 'src/providers/user.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { ErrorItem } from 'src/utils/api-response';
@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  userForm!: FormGroup;
  errorItem: ErrorItem = {
    message: ""
  };
  errors: ErrorItem[] = [];

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private userProvider: UsersProvider,
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
    this.userForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async save() {
    const data = this.userForm.getRawValue();
    try {
      let result = await this.userProvider.saveNewUser(data);
      this.onChange.emit();
      this.snackbarService.successMessage("Usuário criado com sucesso");
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