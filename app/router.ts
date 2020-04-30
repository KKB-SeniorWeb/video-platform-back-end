import { Application } from 'egg';
import { SIGNUP, SIGNUP_CHECK, SIGNIN, VIDEO_UPLOAD, VIDEO_DELETE ,COURASE_ADD} from './const/index';

function signRouter(app) {
  const { controller, router } = app;
  router.post(SIGNUP, controller.signup.index);
  router.post(SIGNUP_CHECK, controller.signup.check);

  router.post(SIGNIN, controller.signin.index);
}

function videoRouter(app) {
  const { controller, router } = app;
  router.post(VIDEO_UPLOAD, controller.video.upload);
  router.post(VIDEO_DELETE, controller.video.delete);
}
function courseRouter(app){
  const { controller, router } = app;
  router.post(COURASE_ADD, controller.AddCourseController.index);
}

export default (app: Application) => {
  signRouter(app);
  videoRouter(app);
  courseRouter(app);
};
