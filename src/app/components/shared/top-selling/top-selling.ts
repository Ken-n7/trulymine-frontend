import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface TopSaleItem {
  perfume_name: string;
  total_quantity_sold: number;
}

interface TopSalesResponse {
  data: Array<{
    perfume_name: string;
    sales_metrics: {
      total_quantity_sold: number;
    };
  }>;
}

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-selling.html',
  styleUrls: ['./top-selling.css'],
})
export class TopSellingComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  femaleScents: TopSaleItem[] = [];
  maleScents: TopSaleItem[] = [];

  ngOnInit() {
    this.loadTopSales();
  }

  loadTopSales() {
    // Load Female top sales
    this.http.get<TopSalesResponse>(`${this.apiUrl}/top-sales/by-gender?gender=Female&limit=5`)
      .subscribe({
        next: (response) => {
          this.femaleScents = response.data.map(item => ({
            perfume_name: item.perfume_name,
            total_quantity_sold: item.sales_metrics.total_quantity_sold
          }));
        },
        error: (err) => console.error('Failed to load female sales', err)
      });

    // Load Male top sales
    this.http.get<TopSalesResponse>(`${this.apiUrl}/top-sales/by-gender?gender=Male&limit=5`)
      .subscribe({
        next: (response) => {
          this.maleScents = response.data.map(item => ({
            perfume_name: item.perfume_name,
            total_quantity_sold: item.sales_metrics.total_quantity_sold
          }));
        },
        error: (err) => console.error('Failed to load male sales', err)
      });
  }
}
