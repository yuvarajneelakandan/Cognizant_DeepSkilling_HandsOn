import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  // Data Binding Properties
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  // Lifecycle Example
  availableCourses = 0;

  ngOnInit(): void {
    // Simulating loading data
    this.availableCourses = 12;

    console.log('HomeComponent initialized - courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}