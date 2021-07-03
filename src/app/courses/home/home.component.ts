import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private dialog: MatDialog,
    private service: CourseEntityService) {

  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.service.entities$.pipe(map((e) => {
      return e.filter(oo => oo.category === 'BEGINNER');
    }));

    this.advancedCourses$ = this.service.entities$.pipe(map((e) => {
      return e.filter(oo => oo.category === 'ADVANCED');
    }));

    this.promoTotal$ = this.service.entities$.pipe(map((e) => {
      return e.filter(oo => oo.promo).length;
    }));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }


}
