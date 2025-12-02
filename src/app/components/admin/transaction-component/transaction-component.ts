import { Component, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Transaction {
  id: number;
  date: string;
  customer: string;
  perfume: string;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-transaction-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-component.html',
  styleUrls: ['./transaction-component.css'],
})
export class TransactionComponent implements OnInit {
  searchTerm = signal('');
  transactions = signal<Transaction[]>([]);

  filteredTransactions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.transactions();

    return this.transactions().filter(
      (t) =>
        t.customer.toLowerCase().includes(term) ||
        t.perfume.toLowerCase().includes(term) ||
        t.date.includes(term)
    );
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.http
      .get<any[]>('http://localhost:8080/api/admin/payments', { withCredentials: true })
      .subscribe({
        next: (data) => {
          const mapped = data.map((payment) => ({
            id: payment.id,
            date: payment.created_date,
            customer: payment.customer ?? 'N/A',
            perfume: payment.order?.perfume_name ?? 'Unknown',
            quantity: payment.order?.quantity ?? 1,
            totalPrice: payment.amount,
          }));
          this.transactions.set(mapped);
        },
        error: (err) => {
          console.error('Failed to load transactions:', err);
          // You can add error handling UI here if needed
        },
      });
  }
}
