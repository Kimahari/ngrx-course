import { compareLessons } from '../../model/lesson';

export const LessonMetaData = {
  Lesson: {
    sortComparer: compareLessons,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }
};
