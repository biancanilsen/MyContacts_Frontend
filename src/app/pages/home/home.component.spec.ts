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
import { HomeComponent } from './home.component';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { By } from '@angular/platform-browser';
import { ContactProvider } from 'src/providers/contact.provider';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let contactProvider: ContactProvider
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
        ConfirmDialogService,
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

    fixture = TestBed.createComponent(HomeComponent);
    contactProvider = TestBed.inject(ContactProvider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <button> with "logout icon"', () => {
    const button = fixture.debugElement.query (By.css('#logout-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('logout');
  });

  it('should have <table>', () => {
    const table = fixture.debugElement.query (By.css('#home-table'));
    expect(table).toBeTruthy();
  });

  it('should have <button> with "edit icon"', () => {
    const button = fixture.debugElement.query (By.css('#add-button'));
    expect((button.nativeElement as HTMLButtonElement).textContent)
    .toContain('add');
  });
});