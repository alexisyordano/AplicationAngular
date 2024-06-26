import { Component, Inject, signal } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Test } from '../../models/app.models';
import _ from 'lodash';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-ping-latency',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgxSkeletonLoaderModule],
  templateUrl: './modal-ping-latency.component.html',
  styleUrl: './modal-ping-latency.component.scss',
})
export class ModalPingLatencyComponent {
  dataLoaded = signal(false);
  emptyView = signal(false);
  dataTest?: any;
  constructor(
    private _snackBar: MatSnackBar,
    private _teamServices: TeamService,
    public dialogRef: MatDialogRef<ModalPingLatencyComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; ip: string; team: string }
  ) {}

  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }

  testIp() {
    this.dataLoaded.set(true);
    this._teamServices.getTestLactation(this.data.ip, this.data.id).subscribe({
      next: (value: Test) => {
        this.dataTest = value;
        if (!_.isEmpty(this.dataTest)) {
          this.emptyView.set(true);
        }
        this.dataLoaded.set(false);
        this.messageSuccess('saved test');
      },
    });
  }

  messageSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duración en milisegundos
    config.verticalPosition = 'top'; // Posición vertical (top o bottom)
    config.horizontalPosition = 'center';

    this._snackBar.open(message, 'Close', config);
  }
}
