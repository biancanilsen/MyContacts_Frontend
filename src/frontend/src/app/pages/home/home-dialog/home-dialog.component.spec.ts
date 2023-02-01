import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactProvider } from 'src/providers/contact.provider';
import { HomeDialogComponent } from './home-dialog.component';

fdescribe('HomeDialogComponent', () => {
  let component: HomeDialogComponent;
  let contactProvider: ContactProvider
  let fixture: ComponentFixture<HomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDialogComponent],
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
    localStorage.setItem('method', 'edit');

    fixture = TestBed.createComponent(HomeDialogComponent);
    contactProvider = TestBed.inject(ContactProvider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateContact method with expected values', () => {
    //Arrange (Preparar)
    fixture.componentInstance.contactForm?.get('nome')?.setValue('nomeTeste');
    fixture.componentInstance.contactForm?.get('email')?.setValue('email@updateContact.com');
    fixture.componentInstance.contactForm?.get('telefone')?.setValue('47958745214');
    const spy = spyOn(contactProvider, 'updateContact').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#save-update-contact-button');

    //Act (Agir após tudo preparado)
    button.click();

    //Assert (Validar se o código agil como esperado)
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ id: null, nome: 'nomeTeste', email: 'email@updateContact.com', telefone: '47958745214'});
  })
});
