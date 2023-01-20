import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  
})
export class ConfirmDialogComponent implements OnInit {
  public titleMessage: string = '';
  public domain: string = '';
  public subtitleMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
  ngOnInit() {
    this.titleMessage = this.data.title;
    this.subtitleMessage = this.data.subtitle;
    this.domain = this.data.domain;
  }
}
