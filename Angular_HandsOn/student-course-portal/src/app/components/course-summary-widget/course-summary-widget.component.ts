import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.loadCourses();

  }

  loadCourses(): void {

    this.courseService.getCourses().subscribe({

      next: (courses) => {
        this.courses = courses;
      },

      error: (error) => {
        console.error('Unable to load courses:', error);
      }

    });

  }

  addSampleCourse(): void {

    const newCourse: Omit<Course, 'id'> = {
      name: 'Artificial Intelligence',
      code: 'AI501',
      credits: 4,
      gradeStatus: 'pending'
    };

    this.courseService.addCourse(newCourse).subscribe({

      next: (course) => {

        console.log('Course added:', course);

        this.loadCourses();

      },

      error: (error) => {
        console.error('Unable to add course:', error);
      }

    });

  }

}