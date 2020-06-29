// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportCourse from '../../../app/service/course';
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
    article: AutoInstanceType<typeof ExportArticle>;
    course: AutoInstanceType<typeof ExportCourse>;
    journal: AutoInstanceType<typeof ExportJournal>;
    jwt: AutoInstanceType<typeof ExportJwt>;
    reply: AutoInstanceType<typeof ExportReply>;
    signin: AutoInstanceType<typeof ExportSignin>;
    signup: AutoInstanceType<typeof ExportSignup>;
    teacher: AutoInstanceType<typeof ExportTeacher>;
    user: AutoInstanceType<typeof ExportUser>;
    video: AutoInstanceType<typeof ExportVideo>;
  }
}
