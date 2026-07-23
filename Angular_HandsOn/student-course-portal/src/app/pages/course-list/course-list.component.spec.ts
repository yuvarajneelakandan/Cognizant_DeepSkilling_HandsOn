import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  provideRouter
} from '@angular/router';

import {
  provideMockStore,
  MockStore
} from '@ngrx/store/testing';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { By } from '@angular/platform-browser';

import {
  CourseListComponent
} from './course-list.component';

import { Course } from '../../models/course.model';


describe('CourseListComponent', () => {

  let component: CourseListComponent;

  let fixture:
    ComponentFixture<CourseListComponent>;

  let store: MockStore;


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


  const initialState = {

    course: {

      courses: mockCourses,

      loading: false,

      error: null

    },

    enrollment: {

      enrolledCourseIds: []

    }

  };


  beforeEach(async () => {

    await TestBed
      .configureTestingModule({

        imports: [
          CourseListComponent
        ],

        providers: [

          provideRouter([]),

          provideHttpClient(),

          provideHttpClientTesting(),

          provideMockStore({
            initialState
          })

        ]

      })
      .compileComponents();


    store =
      TestBed.inject(MockStore);


    fixture =
      TestBed.createComponent(
        CourseListComponent
      );


    component =
      fixture.componentInstance;

  });


  it('should create', () => {

    fixture.detectChanges();

    expect(component)
      .toBeTruthy();

  });


  it('should render courses from NgRx store', () => {

    fixture.detectChanges();

    const cards =
      fixture.debugElement.queryAll(
        By.css('app-course-card')
      );


    expect(cards.length)
      .toBe(2);

  });


  it('should show loading indicator when loading is true', () => {

    store.setState({

      course: {

        courses: [],

        loading: true,

        error: null

      },

      enrollment: {

        enrolledCourseIds: []

      }

    });


    store.refreshState();

    fixture.detectChanges();


    const pageText =
      fixture.nativeElement.textContent;


    expect(pageText)
      .toContain('Loading courses...');

  });

});