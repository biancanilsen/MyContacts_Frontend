import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../../../services/confirm-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule, MatButtonModule, CommonModule, FlexLayoutModule],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
})
export class ConfirmDialogModule { }