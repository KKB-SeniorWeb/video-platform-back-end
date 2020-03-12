// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSignin from '../../../app/service/signin';
import ExportSignup from '../../../app/service/signup';
<<<<<<< Updated upstream
import ExportUser from '../../../app/service/user';
=======
import ExportVideo from '../../../app/service/video';
>>>>>>> Stashed changes

declare module 'egg' {
  interface IService {
    signin: ExportSignin;
    signup: ExportSignup;
<<<<<<< Updated upstream
    user: ExportUser;
=======
    video: ExportVideo;
>>>>>>> Stashed changes
  }
}
