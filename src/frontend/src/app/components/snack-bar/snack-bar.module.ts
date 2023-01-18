import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarComponent } from './snack-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  entryComponents: [],
  exports: [SnackBarComponent],
  providers: [],
})
export class SnackBarModule {}
