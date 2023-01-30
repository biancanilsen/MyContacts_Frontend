import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoginComponent } from './login.component';
import { SnackBarService } from 'src/services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from 'src/providers/auth.provider';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authProvider: AuthProvider;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule, 
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule 
      ],
      declarations: [ LoginComponent ],
      providers: [ SnackBarService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    authProvider = TestBed.inject(AuthProvider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h2> with "Faça seu login"', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const h2 = bannerEl.querySelector('h2')!;
    expect(h2.textContent).toEqual('Faça seu login');
  });

  it('should have <p> with "Acesse a aplicação com seu usuário e sua senha"', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('p')!;
    expect(p.textContent).toEqual('Acesse a aplicação com seu usuário e sua senha');
  });


  it('should have <img> logo', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const img = bannerEl.querySelector('img')!;
    expect(img).toBeTruthy();
  });

  it('should have <input> of "Email', () => {
    const input = fixture.debugElement.query (By.css('#email-input'));
    expect(input).toBeTruthy();
  });

  it('should have <input> of "Password', () => {
    const input = fixture.debugElement.query (By.css('#password-input'));
    expect(input).toBeTruthy();
  });

  it('should have <button> to enter with "*Não possui conta? Clique aqui para se cadastrar"', () => {
    const button = fixture.debugElement.query (By.css('#sigin-up-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('*Não possui conta? Clique aqui para se cadastrar');
  });

  it('should have <button> to enter with "Entrar"', () => {
    const button = fixture.debugElement.query (By.css('#enter-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('Entrar');
  });

  it('should call a POST', () => {
    fixture.componentInstance.loginForm?.get('email')?.setValue('test@test.com');
    fixture.componentInstance.loginForm?.get('password')?.setValue('test');

    const spy = spyOn(authProvider, 'login').and.callThrough();

    const button = fixture.debugElement.nativeElement.querySelector('#enter-button');
    button.click();
    
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({ email: 'test@test.com', password: 'test' })
  })
});
