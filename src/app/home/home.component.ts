import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, noop, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  begCourses$: Observable<Course[]>;
  advCourses$: Observable<Course[]>;

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$.pipe(
      map(res => Object.values(res["payload"])),
      shareReplay()
    );

    this.begCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    );

    this.advCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED'))
    )
  }
}
