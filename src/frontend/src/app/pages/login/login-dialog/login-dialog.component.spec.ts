import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersProvider } from 'src/providers/user.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { LoginDialogComponent } from './login-dialog.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let usersProvider: UsersProvider
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule, 
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
      declarations: [ LoginDialogComponent ],
      providers: [ SnackBarService, 
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        }
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDialogComponent);
    usersProvider = TestBed.inject(UsersProvider); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h2> with "Criar conta"', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const h2 = bannerEl.querySelector('h2')!;
    expect(h2.textContent).toEqual('Criar conta');
  });

  it('should have <button> to enter with "cancel icon"', () => {
    const button = fixture.debugElement.query (By.css('#cancel-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('cancel');
  });

  it('should have <input> of "Email', () => {
    const input = fixture.debugElement.query (By.css('#email-register-input'));
    expect(input).toBeTruthy();
  });

  it('should have <input> of "Password', () => {
    const input = fixture.debugElement.query (By.css('#password-register-input'));
    expect(input).toBeTruthy();
  });

it('should have <button> with "Cancelar"', () => {
    const button = fixture.debugElement.query (By.css('#cancel-register-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('Cancelar');
  });

  it('should have <button> with "Salvar"', () => {
    const button = fixture.debugElement.query (By.css('#save-register-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('Salvar');
  });

  it('should call a POST to save a new user', () => {
    //Arrange (Preparar)
    fixture.componentInstance.userForm?.get('email')?.setValue('teste@register.com');
    fixture.componentInstance.userForm?.get('password')?.setValue('register');
    const spy = spyOn(usersProvider, 'saveNewUser').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#save-register-button');
    fixture.componentInstance.userForm?.invalid

    //Act (Agir após tudo preparado)
    button.click();
    
    //Assert (Validar se o código agil como esperado)
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ email: 'teste@register.com', password: 'register' });
  })

});
