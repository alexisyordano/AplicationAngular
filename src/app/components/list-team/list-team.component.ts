import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team, TeamData } from '../../models/app.models';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, filter, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ModalPingLatencyComponent } from '../modal-ping-latency/modal-ping-latency.component';

@Component({
  selector: 'list-team',
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list-team.component.html',
  styleUrl: './list-team.component.scss',
})
export class ListTeamComponent {
  team: any;
  permission: any;
  selectedTeam: any;
  searchControl = new FormControl();
  @Output() onDetailTeam: EventEmitter<Team> = new EventEmitter<Team>();

  constructor(private _TeamService: TeamService, public dialog: MatDialog) {}

  dataObs$?: Observable<any>;
  dataSource?: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  pageSizeOptions: number[] = [5, 25, 100];

  private _refreshList: { refresh: boolean } = { refresh: false };
  public get loaded(): { refresh: boolean } {
    return this._refreshList;
  }
  @Input() set loaded(v: { refresh: boolean }) {
    this._refreshList = v;
    if (this._refreshList.refresh) {
      this.load();
    }
  }
  ngOnInit() {
    let storedRole = localStorage.getItem('role');
    if (storedRole) {
      storedRole = storedRole.replace(/"/g, '');

      if (storedRole === 'admin' || storedRole === 'user') {
        this.permission = storedRole;
      }
    }
    this.load();
  }

  filterTeam() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter((value) => value.length >= 3),
        switchMap((value) => this._TeamService.searchTeams(value))
      )
      .subscribe((response: any) => {
        this.team = response.data;
        console.log('data', this.team);
        this.dataSourceTablePagination(this.team);
      });
  }

  load() {
    this._TeamService.getTeam().subscribe((response: Team) => {
      this.team = response.data;
      this.dataSourceTablePagination(this.team);
    });
  }

  dataSourceTablePagination(data: any) {
    this.dataSource = new MatTableDataSource<Team>(data);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    this.dataObs$ = this.dataSource.connect();
  }

  detailTeam(item: any) {
    this.selectedTeam = item;
    this.onDetailTeam.emit(this.selectedTeam);
  }

  pageChanged(pageEvent: PageEvent) {
    console.log(pageEvent);
  }

  testPing(data: TeamData) {
    this.dialog.open(ModalPingLatencyComponent, {
      width: '628px',
      height: '320px',
      disableClose: true,
      data: { id: data.id, team: data.name, ip: data.adress },
    });
  }
}
