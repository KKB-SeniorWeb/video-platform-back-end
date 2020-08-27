// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportCourse from '../../../app/model/course';
import ExportCourseVideo from '../../../app/model/course_video';
import ExportJournal from '../../../app/model/journal';
import ExportReply from '../../../app/model/reply';
import ExportTeacher from '../../../app/model/teacher';
import ExportUser from '../../../app/model/user';
import ExportVideo from '../../../app/model/video';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Course: ReturnType<typeof ExportCourse>;
    CourseVideo: ReturnType<typeof ExportCourseVideo>;
    Journal: ReturnType<typeof ExportJournal>;
    Reply: ReturnType<typeof ExportReply>;
    Teacher: ReturnType<typeof ExportTeacher>;
    User: ReturnType<typeof ExportUser>;
    Video: ReturnType<typeof ExportVideo>;
  }
}
