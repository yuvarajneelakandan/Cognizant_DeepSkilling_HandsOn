import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {

  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

 ngOnInit(): void {

  const id = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.courseService.getCourseById(id).subscribe({

    next: (course) => {
      this.course = course;
    },

    error: (error) => {
      console.error('Unable to load course:', error);
      this.course = undefined;
    }

  });

}

}