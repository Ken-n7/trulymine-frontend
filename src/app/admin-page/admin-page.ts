import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../components/admin/navigation-component/navigation-component';

@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {

}
