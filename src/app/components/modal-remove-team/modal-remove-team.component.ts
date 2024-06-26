import { Component, Inject } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '../../models/app.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-remove-team',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './modal-remove-team.component.html',
  styleUrl: './modal-remove-team.component.scss',
})
export class ModalRemoveTeamComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private _teamServices: TeamService,
    public dialogRef: MatDialogRef<ModalRemoveTeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: string
  ) {}

  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }

  DeleteTeam() {
    this._teamServices.delete(this.data).subscribe({
      next: (value: Team) => {
        if (!value) {
          this.messageSuccess(
            'cannot be eliminated, lactation tests have been performed'
          );
        }
        this.dialogRef.close(value);
      },
      error: (err) => {
        this.dialogRef.close(err);
      },
    });
  }

  messageSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000; // Duración en milisegundos
    config.verticalPosition = 'top'; // Posición vertical (top o bottom)
    config.horizontalPosition = 'center';

    this._snackBar.open(message, 'Close', config);
  }
}
