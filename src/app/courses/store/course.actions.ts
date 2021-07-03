import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Course } from './../model/course';

export const loadAllCourses = createAction('[Courses Resolver] load all courses');
export const allCoursesLoaded = createAction('[Load Courses Effect] all courses loaded', props<{ cources: Course[] }>());
export const allCoursesLoadError = createAction('[Load Courses Effect] courses loading error', props<{ error: Error }>());
export const courseUpdated = createAction('[Edit Course Dialog] course updated', props<{ update: Update<Course> }>());
