import { compareCourses } from '../../model/course';

export const CourseMetaData = {
  Course: {
    sortComparer: compareCourses,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }
};
