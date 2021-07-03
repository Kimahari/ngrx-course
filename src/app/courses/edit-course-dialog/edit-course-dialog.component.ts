import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoursesHttpService } from '../services/courses-http.service';
import { Store } from '@ngrx/store';
import { courseUpdated } from '../store/course.actions';

import { isObject, transform, isEqual } from 'lodash-es';

function difference<TObject>(object: any, base: TObject): Partial<TObject> {
  function changes<T>(cobj: any, cbase: T) {
    return transform(cobj, function (result: any, value: any, key: string) {
      if (!isEqual(value, cbase[key])) {
        result[key] = (isObject(value) && isObject(cbase[key])) ? changes(value, cbase[key]) : value;
      }
    });
  }
  return changes(object, base);
}

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<any>) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode === 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.course });
    } else if (this.mode === 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.store.dispatch(courseUpdated({
      update: {
        id: this.course.id,
        changes: difference(this.form.value, this.course)
      }
    }));

    this.dialogRef.close();
  }
}
