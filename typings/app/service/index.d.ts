// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSignin from '../../../app/service/signin';
import ExportSignup from '../../../app/service/signup';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    signin: ExportSignin;
    signup: ExportSignup;
    user: ExportUser;
  }
}
