import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { TopSellingComponent } from '../../shared/top-selling/top-selling';

@Component({
  selector: 'app-dashboard-component',
  imports: [ CommonModule, TopSellingComponent ],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.renderBarChart();
    this.renderLineChart();
  }

  renderBarChart() {
    const ctx = (document.getElementById('barChart') as HTMLCanvasElement).getContext('2d');

    new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Sugar Crush', 'Vanilla Charm', 'Golden Bloom', 'Limitless', 'Valaya', 'Dream Away', 'Rosy Velvet', 'Tender Mist', 'The Temptation', 'Machismo'],
        datasets: [{
          label: 'Sales',
          data: [10, 9, 8, 7, 6, 5, 4, 3, 10, 9],
          backgroundColor: '#3498db',
          borderRadius: 6,
          barPercentage: 0.6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

  renderLineChart() {
    const ctx = (document.getElementById('lineChart') as HTMLCanvasElement).getContext('2d');

    new Chart(ctx!, {
      type: 'line',
      data: {
        labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
        datasets: [{
          label: 'Daily Sales',
          data: [
            5, 7, 6, 8, 10, 15, 18, 20, 25, 22,
            24, 28, 30, 35, 33, 32, 30, 28, 25, 22,
            20, 18, 16, 15, 13, 10, 9, 7, 6, 5
          ],
          fill: true,
          borderColor: '#e67e22',
          backgroundColor: 'rgba(230, 126, 34, 0.3)',
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 5 }
          }
        }
      }
    });
  }
}
