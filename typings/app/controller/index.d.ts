// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJournal from '../../../app/controller/journal';
import ExportSignin from '../../../app/controller/signin';
import ExportSignup from '../../../app/controller/signup';
import ExportVideo from '../../../app/controller/video';

declare module 'egg' {
  interface IController {
    journal: ExportJournal;
    signin: ExportSignin;
    signup: ExportSignup;
    video: ExportVideo;
  }
}
