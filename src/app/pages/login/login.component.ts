import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthProvider } from 'src/providers/auth.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorItem } from 'src/utils/api-response';
import { User } from 'src/models/userModel';
import { MyChangeEvent } from 'src/models/eventModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit{
  @Output() onChange: EventEmitter<MyChangeEvent> = new EventEmitter();
  loginForm!: FormGroup;
  form!: FormGroup;
  isLoading: boolean = false;
  user: any
  public isLogged = false;
  public get fb(): FormBuilder {
    return this._fb;
  }
  public set fb(value: FormBuilder) {
    this._fb = value;
  }
  errorItem: ErrorItem = {
    message: ""
  };
  errors: ErrorItem[] = [];

  
  constructor(
    private _fb: FormBuilder,
    private authProvider: AuthProvider,
    private router: Router,
    private snackbarService: SnackBarService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {  
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
    });
  }


  loginUser(){
    this.loginForm.controls['email'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();
  }

  async onSubmit(): Promise<void> {
    if(this.loginForm.valid){
      const formData = this.loginForm.getRawValue();
      const data = {
        email: formData.email,
        password: formData.password,
      };
  
      try {
        const response = await this.authProvider.login(data );
        if (response.errors && response.errors.length > 0) {
          this.errors = response.errors;
        } else {
          this.isLoading = true;
          localStorage.setItem('token', response.apiResponse.token);
          this.isLogged = true;
          this.router.navigate(['/home']);
          this.onChange.emit();
          this.snackbarService.successMessage("Login efetuado com sucesso");
        } 
      } catch {
        this.errors = [{ message: "Ocorreu um erro ao fazer login. Tente novamente." }];
      }
    }
  }

  openDialogCreateUser(userSelected: User) {
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
      height: '380px',
      data: userSelected,
    });
  }
  
}
