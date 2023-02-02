import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactProvider } from 'src/providers/contact.provider';

import { CreateContactDialogComponent } from './create-contact-dialog.component';

describe('CreateContactDialogComponent', () => {
  let component: CreateContactDialogComponent;
  let contactProvider: ContactProvider
  let fixture: ComponentFixture<CreateContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContactDialogComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTableModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: () => { } }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    let store: { [key: string]: string } = {};

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : '';
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(Storage.prototype, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(Storage.prototype, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(Storage.prototype, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(Storage.prototype, 'clear').and.callFake(mockLocalStorage.clear);

    localStorage.setItem('token', 'fakeTokenValue');

    fixture = TestBed.createComponent(CreateContactDialogComponent);
    contactProvider = TestBed.inject(ContactProvider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have <h2> with "Criar novo contato"', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const h2 = bannerEl.querySelector('h2')!;
    expect(h2.textContent).toEqual('Criar novo contato');
  });

  it('should have <button> to leave with "cancel icon"', () => {
    const button = fixture.debugElement.query (By.css('#close-create-contact-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('cancel');
  });

  it('should have <input> of "Nome', () => {
    const input = fixture.debugElement.query (By.css('#name-create-contact-input'));
    expect(input).toBeTruthy();
  });

  it('should have <input> of "Telefone', () => {
    const input = fixture.debugElement.query (By.css('#phone-create-contact-input'));
    expect(input).toBeTruthy();
  });

  it('should have <input> of "Email', () => {
    const input = fixture.debugElement.query (By.css('#email-create-contact-input'));
    expect(input).toBeTruthy();
  });

it('should have <button> with "Cancelar"', () => {
    const button = fixture.debugElement.query (By.css('#cancel-create-contact-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('Cancelar');
  });

  it('should have <button> with "Salvar"', () => {
    const button = fixture.debugElement.query (By.css('#save-create-contact-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('Salvar');
  });

  it('should call saveNewContact method with expected values', () => {
    //Arrange (Preparar)
    fixture.componentInstance.contactForm?.get('nome')?.setValue('nomeTeste');
    fixture.componentInstance.contactForm?.get('telefone')?.setValue('47958745214');
    fixture.componentInstance.contactForm?.get('email')?.setValue('email@updateContact.com');
    const spy = spyOn(contactProvider, 'saveNewContact').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#save-create-contact-button');

    //Act (Agir após tudo preparado)
    button.click();

    //Assert (Validar se o código agil como esperado)
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ id: null, nome: 'nomeTeste', email: 'email@updateContact.com', telefone: '47958745214'});
  })
});
