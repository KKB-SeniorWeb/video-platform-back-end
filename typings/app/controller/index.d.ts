// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportCourse from '../../../app/controller/course';
import ExportJournal from '../../../app/controller/journal';
import ExportReply from '../../../app/controller/reply';
import ExportSignin from '../../../app/controller/signin';
import ExportSignup from '../../../app/controller/signup';
import ExportTeacher from '../../../app/controller/teacher';
import ExportUser from '../../../app/controller/user';
import ExportVideo from '../../../app/controller/video';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    course: ExportCourse;
    journal: ExportJournal;
    reply: ExportReply;
    signin: ExportSignin;
    signup: ExportSignup;
    teacher: ExportTeacher;
    user: ExportUser;
    video: ExportVideo;
  }
}
