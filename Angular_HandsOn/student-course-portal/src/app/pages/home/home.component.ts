import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CourseSummaryWidgetComponent,NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  // Data Binding Properties
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  // Display course count from CourseService
  courseCount = 0;

  constructor(
    private courseService: CourseService
  ) { }

ngOnInit(): void {

  this.courseService.getCourses().subscribe({

    next: (courses) => {
      this.courseCount = courses.length;
    },

    error: (error) => {
      console.error('Unable to load course count:', error);
    }

  });

  console.log('HomeComponent initialized - courses loaded');

}
  ngOnDestroy(): void {

    console.log('HomeComponent destroyed');

  }

  onEnrollClick(): void {

    this.message = 'Enrollment opened!';

  }

}