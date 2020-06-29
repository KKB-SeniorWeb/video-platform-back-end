// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/error-handler';
import ExportPermissionsValidation from '../../../app/middleware/permissions-validation';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    permissionsValidation: typeof ExportPermissionsValidation;
  }
}
