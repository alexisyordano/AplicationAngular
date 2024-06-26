import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import _ from 'lodash';

@Component({
  selector: 'chart-pie-lactency',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './chart-pie-lactency.component.html',
  styleUrl: './chart-pie-lactency.component.scss',
})
export class ChartPieLactencyComponent {
  HighchartsDonuts: typeof Highcharts = Highcharts;
  chartOptionsDonuts?: Highcharts.Options;
  updateFlag = false;
  emptyView: boolean = false;

  @Input() public set chartPieData(value: any[]) {
    if (value) {
      let groupedData = _.groupBy(value, 'response');

      let result = _.map(groupedData, (group, key) => ({
        name: key === '1' ? 'Response Success' : 'Response Failure',
        y: (group.length / value.length) * 100, // Calculate the percentage
        sliced: key === '1', // Mark as cut if '1'
        selected: key === '1', // Mark as selected if '1'
        color: key === '1' ? 'green' : 'red', // Assign color based on key
      }));

      const resultData: Highcharts.SeriesOptionsType[] = _.map(
        result,
        (items) => {
          return {
            name: items.name,
            y: items.y,
            type: 'pie',
            color: items.color,
          };
        }
      );

      this.loadChartPieData(resultData);
    }
    this.updateFlag = true;
  }

  loadChartPieData(data: any) {
    this.chartOptionsDonuts = {
      chart: {
        type: 'pie',
        style: {
          width: 300,
          height: 300,
        },
      },
      title: {
        text: '<strong>statistics graphs</strong>',
      },
      subtitle: {
        text: '',
      },
      credits: { enabled: false },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      xAxis: {
        min: 0,
        title: {
          text: null,
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
            format: '{point.name}: {point.y:.1f}%',
          },
          showInLegend: true,
        },
      },

      tooltip: {
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          type: 'pie',
          name: 'Example Pie Chart',
          data: data,
        },
      ],
    };
  }
}
