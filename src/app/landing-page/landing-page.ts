import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSellingComponent } from '../components/shared/top-selling/top-selling';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, TopSellingComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  print() {
    // Check localStorage
    console.log('Token:', localStorage.getItem('auth_token'));
    console.log('User:', localStorage.getItem('user'));
  }
}
