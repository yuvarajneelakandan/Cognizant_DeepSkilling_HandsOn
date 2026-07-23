import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';

import { provideMockStore } from '@ngrx/store/testing';

import { CourseCardComponent } from './course-card.component';


describe('CourseCardComponent', () => {

  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;


  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      // CourseCardComponent is standalone,
      // therefore it belongs in imports.
      imports: [
        CourseCardComponent
      ],

      providers: [

        provideMockStore({
          initialState: {

            enrollment: {
              enrolledCourseIds: []
            }

          }
        })

      ]

    }).compileComponents();


    fixture =
      TestBed.createComponent(CourseCardComponent);

    component =
      fixture.componentInstance;

  });


  // Test 1
  it('should create', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    expect(component).toBeTruthy();

  });


  // Test 2
  it('should render the course name', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const heading =
      fixture.debugElement.query(
        By.css('h3')
      ).nativeElement;

    expect(
      heading.textContent.trim()
    ).toBe('Data Structures');

  });


  // Test 3
  it('should display the course code', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const content =
      fixture.nativeElement.textContent;

    expect(content).toContain('CS101');

  });


  // Test 4
  it('should emit enrollRequested when Enroll is clicked', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    spyOn(
      component.enrollRequested,
      'emit'
    );

    const buttons =
      fixture.debugElement.queryAll(
        By.css('button')
      );

    // First button is the NgRx Enroll button.
    const enrollButton = buttons[0];

    enrollButton.nativeElement.click();

    fixture.detectChanges();

    expect(
      component.enrollRequested.emit
    ).toHaveBeenCalledWith(1);

  });


  // Test 5
  it('should call ngOnChanges when course input changes', () => {

    const consoleSpy =
      spyOn(console, 'log');

    component.course = mockCourse;

    component.ngOnChanges({

      course: new SimpleChange(
        undefined,
        mockCourse,
        true
      )

    });

    expect(consoleSpy)
      .toHaveBeenCalled();

  });

});