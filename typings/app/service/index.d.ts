// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/service/article';
import ExportJournal from '../../../app/service/journal';
import ExportJwt from '../../../app/service/jwt';
import ExportReply from '../../../app/service/reply';
import ExportSignin from '../../../app/service/signin';
import ExportSignup from '../../../app/service/signup';
import ExportTeacher from '../../../app/service/teacher';
import ExportUser from '../../../app/service/user';
import ExportVideo from '../../../app/service/video';

declare module 'egg' {
  interface IService {
    article: ExportArticle;
    journal: ExportJournal;
    jwt: ExportJwt;
    reply: ExportReply;
    signin: ExportSignin;
    signup: ExportSignup;
    teacher: ExportTeacher;
    user: ExportUser;
    video: ExportVideo;
  }
}
