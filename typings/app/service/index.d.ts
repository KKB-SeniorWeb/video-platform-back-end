// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSignup from '../../../app/service/signup';

declare module 'egg' {
  interface IService {
    signup: ExportSignup;
  }
}
