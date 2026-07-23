import { TestBed } from '@angular/core/testing';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { CourseService } from './course.service';

import { Course } from '../models/course.model';


describe('CourseService', () => {

  let service: CourseService;

  let httpMock: HttpTestingController;


  const mockCourses: Course[] = [

    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },

    {
      id: 2,
      name: 'Angular',
      code: 'ANG101',
      credits: 3,
      gradeStatus: 'pending'
    }

  ];


  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [

        CourseService,

        provideHttpClient(),

        provideHttpClientTesting()

      ]

    });


    service =
      TestBed.inject(CourseService);

    httpMock =
      TestBed.inject(HttpTestingController);

  });


  afterEach(() => {

    // Ensures that no unexpected HTTP
    // requests remain after each test.
    httpMock.verify();

  });


  it('should be created', () => {

    expect(service).toBeTruthy();

  });


  it('should handle HTTP errors after retries', () => {

  service.getCourses().subscribe({

    next: () => {

      fail('Expected an HTTP error');

    },

    error: (error: Error) => {

      expect(error).toBeTruthy();

      expect(error.message)
        .toContain('Failed to load courses');

    }

  });


  // Initial HTTP request
  const request1 =
    httpMock.expectOne(
      'http://localhost:3000/courses'
    );

  request1.flush(
    'Server Error',
    {
      status: 500,
      statusText: 'Internal Server Error'
    }
  );


  // retry(2) - first retry
  const request2 =
    httpMock.expectOne(
      'http://localhost:3000/courses'
    );

  request2.flush(
    'Server Error',
    {
      status: 500,
      statusText: 'Internal Server Error'
    }
  );


  // retry(2) - second retry
  const request3 =
    httpMock.expectOne(
      'http://localhost:3000/courses'
    );

  request3.flush(
    'Server Error',
    {
      status: 500,
      statusText: 'Internal Server Error'
    }
  );

});

});