import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard-component/dashboard-component';
import { InventoryComponent } from "../inventory-component/inventory-component";
import { TransactionComponent } from "../transaction-component/transaction-component";


@Component({
  selector: 'app-navigation-component',
  imports: [ CommonModule, DashboardComponent, InventoryComponent, TransactionComponent ],
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.css',
})
export class NavigationComponent {
  activeSection: string = 'dashboard';

  showSection(section: string) {
    this.activeSection = section;
  }
}
