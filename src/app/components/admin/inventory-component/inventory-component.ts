import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-inventory-component',
  templateUrl: './inventory-component.html',
  styleUrls: ['./inventory-component.css'],
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  isModalOpen = false;
  selectedItem: InventoryItem | null = null;
  editQuantity: number = 0;

  // Your API base URL from environment
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.http.get<InventoryItem[]>(`${this.API_URL}/inventory`).subscribe({
      next: (data) => {
        this.inventory = data;
      },
      error: (err) => {
        console.error('Error loading inventory:', err);
      },
    });
  }

  openEditModal(item: InventoryItem): void {
    this.selectedItem = { ...item }; // clone object to avoid binding issues
    this.editQuantity = item.quantity;
    this.isModalOpen = true;
  }

  closeEditModal(): void {
    this.isModalOpen = false;
    this.selectedItem = null;
    this.editQuantity = 0;
  }

  saveEdit(): void {
    if (!this.selectedItem) return;

    const updatedQuantity = this.editQuantity;

    // API call to update stock quantity for this item
    this.http
      .put(`${this.API_URL}/inventory/${this.selectedItem.id}`, {
        quantity: updatedQuantity,
      })
      .subscribe({
        next: () => {
          // Update local inventory array after successful update
          const index = this.inventory.findIndex(
            (i) => i.id === this.selectedItem!.id
          );
          if (index !== -1) {
            this.inventory[index].quantity = updatedQuantity;
          }
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating inventory:', err);
        },
      });
  }
}
