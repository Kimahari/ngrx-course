import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesAdapter } from './courses.reducers';

export const selectFeature = createFeatureSelector<CoursesState>('courses');

const selectors = coursesAdapter.getSelectors();

export const selectAllCourses = createSelector(selectFeature, (state) => {
  return selectors.selectAll(state);
});

export const selectCoursesLoaded = createSelector(selectFeature, (state) => {
  return state.allCoursesLoaded;
});

export const selectBeginerCourses = createSelector(selectAllCourses, (courses) => {
  return courses.filter(oo => oo.category === 'BEGINNER');
});

export const selectAdvancedCourses = createSelector(selectAllCourses, (courses) => {
  return courses.filter(oo => oo.category === 'ADVANCED');
});

export const selectPremotionTotal = createSelector(selectAllCourses, (courses) => {
  return courses.filter(oo => oo.promo === true).length;
});
