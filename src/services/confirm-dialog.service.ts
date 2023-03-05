import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/snack-bar/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options: any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.data.title,
        subtitle: options.data.subtitle,
        domain: options.data.domain,
      },
      panelClass: options.panelClass,
      backdropClass: options.backdropClass,
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map(res => {
        return res;
      })
    );
  }
}
