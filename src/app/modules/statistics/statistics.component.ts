import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { TeamService } from '../../services/team.service';
import { ResultLatencyTest } from '../../models/app.models';
import { ChartPieLactencyComponent } from '../../components/chart-pie-lactency/chart-pie-lactency.component';
import _ from 'lodash';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { Subject, debounceTime, takeUntil } from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'statistics',
  standalone: true,
  imports: [
    ToolbarComponent,
    MenuComponent,
    ChartPieLactencyComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StatisticsComponent {
  constructor(public _teamServices: TeamService) {}
  graphData: ResultLatencyTest[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  startDate?: string | null;
  endDate?: string | null;
  range = new FormGroup({
    start: new FormControl<Date | null>(moment().startOf('month').toDate()),
    end: new FormControl<Date | null>(moment().endOf('day').toDate()),
  });
  ngOnInit() {
    this.range.controls.end.valueChanges
      .pipe(debounceTime(300), takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        if (value) {
          this.loadFilterDate();
        }
      });

    this.loadFilterDate();
  }

  loadFilterDate() {
    this.startDate = this.range.value.start
      ? moment(new Date(this.range.value.start)).startOf('day').utc().format()
      : null;

    this.endDate = this.range.value.end
      ? moment(new Date(this.range.value.end)).endOf('day').utc().format()
      : null;

    const startDate = this.startDate || new Date().toISOString();
    const endDate = this.endDate || new Date().toISOString();
    this._teamServices
      .getGraphDate(startDate, endDate)
      .subscribe((res: any) => {
        this.graphData = _.map(res, (item) => new ResultLatencyTest(item));
      });
  }
}
