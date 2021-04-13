import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rxp-success-dialog',
  templateUrl: 'success-dialog.html',
  styleUrls: ['success-dialog.scss']
})
export class SuccessDialogComponent {
  constructor(private router: Router,
              private dialogRef: MatDialogRef<SuccessDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData) {}

  next() {
    if (this.dialogData.nextCode) {
      this.dialogRef.close();
      this.router.navigate(['/puzzle', this.dialogData.nextCode]).then();
    }
  }

  dashboard() {
    this.dialogRef.close();
    this.router.navigate(['/dashboard']).then();
  }
}
