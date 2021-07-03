import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Course, compareCourses } from '../model/course';
import * as fromCourses from './course.actions';
import * as fromAuth from './../../auth/auth.actions';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const coursesAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: course => course.id
});

const initialState = coursesAdapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialState,
  on(fromCourses.allCoursesLoaded, (state, data) => {
    const next = coursesAdapter.upsertMany(data.cources, state);
    return { ...next, allCoursesLoaded: true };
  }),
  on(fromAuth.logout, (state, data) => {
    return { ...initialState };
  }),
  on(fromCourses.courseUpdated, (state, data) => {
    return coursesAdapter.updateOne(data.update, state);
  })
);
