import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateContactDialogComponent } from './pages/home/update-contact-dialog/update-contact-dialog.component';
import { LoginDialogComponent } from './pages/login/login-dialog/login-dialog.component';
import { CreateContactDialogComponent } from './pages/home/create-contact-dialog/create-contact-dialog.component';
import { SnackBarService } from '../services/snackbar.service';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { ConfirmDialogModule } from './components/snack-bar/confirm-dialog/confirm-dialog.module';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ApiClient } from 'src/apiClient';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SnackBarComponent,
    UpdateContactDialogComponent,
    LoginDialogComponent,
    CreateContactDialogComponent,
    ErrorMessageComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    LayoutModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    ConfirmDialogModule,
    MatDialogModule,
    MatToolbarModule,
    MatChipsModule
  ],
  providers: [SnackBarService, ConfirmDialogService, ApiClient, provideEnvironmentNgxMask(),],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
