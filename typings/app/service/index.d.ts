// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwt from '../../../app/service/jwt';
import ExportSignin from '../../../app/service/signin';
import ExportSignup from '../../../app/service/signup';
import ExportUser from '../../../app/service/user';
import ExportVideo from '../../../app/service/video';

declare module 'egg' {
  interface IService {
    jwt: ExportJwt;
    signin: ExportSignin;
    signup: ExportSignup;
    user: ExportUser;
    video: ExportVideo;
  }
}
