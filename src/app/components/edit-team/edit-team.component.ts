import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import _ from 'lodash';
import { TeamService } from '../../services/team.service';
import { Team, TeamData } from '../../models/app.models';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ModalRemoveTeamComponent } from '../modal-remove-team/modal-remove-team.component';

@Component({
  selector: 'edit-team',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.scss',
})
export class EditTeamComponent {
  @Output() onRefresh: EventEmitter<{ refresh: boolean }> = new EventEmitter<{
    refresh: boolean;
  }>();

  label?: string;
  permission: any;

  private _value: any;
  public get editTeam(): any {
    return this._value;
  }
  @Input() set editTeam(v: any) {
    this._value = v;
    this.loadTeam(this._value);
    let empty = _.isEmpty(this._value);
    this.label = empty ? 'Save' : 'Edit';
  }

  formTeam: FormGroup;
  enableDelete: boolean = true;
  constructor(
    public _teamServices: TeamService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.formTeam = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    let storedRole = localStorage.getItem('role');
    if (storedRole) {
      storedRole = storedRole.replace(/"/g, '');

      if (storedRole === 'admin' || storedRole === 'user') {
        this.permission = storedRole;
      }
    }
  }

  loadTeam(team: any) {
    //editar
    if (team?.id !== '') {
      this.formTeam.get('id')?.setValue(team?.id);
      this.formTeam.get('name')?.setValue(team?.name);
      this.formTeam.get('adress')?.setValue(team?.adress);
      this.formTeam.get('description')?.setValue(team?.description);
      this.enableDelete = false;
    } else {
      //crear
      this.formTeam.reset();
    }
  }

  Save() {
    if (this.formTeam.invalid) {
      return;
    }
    let dataForm = Object.assign(this.formTeam.value);
    if (!_.isUndefined(dataForm.id)) {
      //edit
      this._teamServices.update(dataForm).subscribe(
        (response: Team) => {
          this.onRefresh.emit({ refresh: true });
          this.editTeam = new Team(response);
          this.messageSuccess('edited');
          this.formTeam.enable();
        },
        (error: any) => {
          this.messageError('duplicate ip address');
          console.error('Error:', error.error.message);
        }
      );
    } else {
      //create
      this._teamServices.create(dataForm).subscribe(
        (response: any) => {
          this.onRefresh.emit({ refresh: true });
          dataForm = new Team(response);
          this.messageSuccess('created');
          this.formTeam.enable();
        },
        (error: any) => {
          this.messageError(error.error.errors.adress[0]);
          console.error('Error:', error.error.errors.adress[0]);
        }
      );
    }
  }

  openModalRemove(check: boolean) {
    if (check) {
      const removeModal = this.dialog.open(ModalRemoveTeamComponent, {
        width: '628px',
        height: '320px',
        disableClose: true,
        data: this.editTeam?.id,
      });
      removeModal.afterClosed().subscribe((result) => {
        if (result?.message == 'confirm') {
          this.messageSuccess('deleted');
          this.onRefresh.emit({ refresh: true });
        } else {
          this.enableDelete = false;
        }
      });
    }
  }

  messageError(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duración en milisegundos
    config.verticalPosition = 'top'; // Posición vertical (top o bottom)
    config.horizontalPosition = 'center';
    this._snackBar.open(message, 'Close', config);
  }

  messageSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duración en milisegundos
    config.verticalPosition = 'top'; // Posición vertical (top o bottom)
    config.horizontalPosition = 'center';
    const snackBarMessage =
      message === 'created'
        ? 'team successfully registered'
        : message === 'edited'
        ? 'team successfully edited'
        : message === 'deleted'
        ? 'team successfully eliminated'
        : '';

    if (snackBarMessage) {
      this._snackBar.open(snackBarMessage, 'Close', config);
    }
  }
}
