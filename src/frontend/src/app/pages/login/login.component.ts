import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthProvider } from 'src/providers/auth.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit{
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
  
  constructor(
    private _fb: FormBuilder,
    private authProvider: AuthProvider,
    private router: Router,
    private snackbarService: SnackBarService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2),
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
        const auth = await this.authProvider.login(data);
        this.isLoading = true;
        localStorage.setItem("token", auth.apiResponse.token);
        this.isLogged = true;
        this.router.navigate(['/home']);
        
      } catch (err: any) {
        console.log('ERROR 132' + err);
        this.snackbarService.showError(
          err.error?.message ?? 'Ocorreu um erro, tente novamente'
        );
      }
    }
  }

  openDialogCreateUser(userSelected: any){
        this.dialog.open(LoginDialogComponent, {
            width: '400px',
            height: '380px',
            data: userSelected,
        });
  }
}
