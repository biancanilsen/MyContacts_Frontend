import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Injectable()
export class SnackBarService {
  constructor(public snackBar: MatSnackBar, public zone: NgZone) {}

  public showAlert(message: string, icon?: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      panelClass: 'success-message',
      verticalPosition: 'bottom',
      duration: 5000,
      data: {
        message: message,
        icon: icon ? icon : null,
      },
    });
  }

  public successMessage(message: string): void {
    this.zone.run(() => {
      const snackBar = this.snackBar.open(message, 'OK', {
        panelClass: 'success-message',
        verticalPosition: 'bottom',
        duration: 5000,
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }

  public showError(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      panelClass: 'error-message',
      verticalPosition: 'bottom',
      duration: 10000,
      data: {
        hasAction: true,
        message: message,
      },
    });
  }
}
